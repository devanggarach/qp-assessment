import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { ERROR } from './response.status';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../components/user/user.repository';
import { logger } from '../services/logger';
import { ServiceResponse } from './serviceResponse.helper';
import { AdminRepository } from '../components/admin/admin.repository';
import { IUser } from 'components/user/user.dto';
import { IAdmin } from 'components/admin/admin.dto';
import { CommonHelper } from './common.helper';

export class AuthHelper {
	// Middleware to verify JWT token
	static readonly serviceResponse = new ServiceResponse();

	static readonly authValidate = async (req: Request, res: Response, next: NextFunction) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;

		const accessToken: string = req.headers?.authorization?.split(' ')[1] ?? req.headers?.authorization ?? '';
		const exception = serviceResponse.authenticationError({
			errorCode: ERROR.UNAUTHORIZED_ACCESS.CODE,
			message: ERROR.UNAUTHORIZED_ACCESS.MESSAGE,
			error: ERROR.UNAUTHORIZED_ACCESS.ERROR,
			meta: {},
		});

		if (CommonHelper.empty(accessToken)) {
			return res.status(exception.statusCode).json(exception);
		}

		try {
			const decoded: any = jwt.verify(
				accessToken,
				Config.jwtAuthentication.authKeyToSignJWT,
				Config.jwtAuthentication.signOptions,
			);

			if (!decoded?.id) return res.status(exception.statusCode).json(exception);

			const user = await UserRepository.findById(traceId, decoded.id);
			logger.info({ user }, 'userauthvalidate');
			if (!user) return res.status(exception.statusCode).json(exception);

			const { passwordHash, ...userSafe } = user;
			logger.info({ user, userSafe }, 'user, usersafe');
			req.user = userSafe as IUser;
			next();
		} catch (error: any) {
			logger.error({ traceId, error }, 'AuthHelper | authValidate | Error');

			if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
				return res.status(exception.statusCode).json(exception);
			}

			const unhandled = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			return res.status(unhandled.statusCode).json(unhandled);
		}
	};

	static readonly adminAuthValidate = async (req: Request, res: Response, next: NextFunction) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;

		const accessToken: string = req.headers?.authorization?.split(' ')[1] ?? req.headers?.authorization ?? '';

		const exception = serviceResponse.authenticationError({
			traceId,
			errorCode: ERROR.UNAUTHORIZED_ACCESS.CODE,
			message: ERROR.UNAUTHORIZED_ACCESS.MESSAGE,
			error: ERROR.UNAUTHORIZED_ACCESS.ERROR,
			meta: {},
		});

		try {
			const decoded: any = jwt.verify(
				accessToken,
				Config.jwtAuthentication.authKeyToSignJWT,
				Config.jwtAuthentication.signOptions,
			);

			if (!decoded?.id) return res.status(exception.statusCode).json(exception);

			const admin = await AdminRepository.findById(traceId, decoded.id); // Prisma Admin
			if (!admin) return res.status(exception.statusCode).json(exception);

			const { passwordHash, ...adminSafe } = admin;
			req.user = adminSafe as IAdmin;
			next();
		} catch (error: any) {
			logger.error({ traceId, error }, 'AuthHelper | adminAuthValidate | Error');
			if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
				return res.status(exception.statusCode).json(exception);
			}

			const unhandled = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			return res.status(unhandled.statusCode).json(unhandled);
		}
	};

	// Generate Jwt Token
	static readonly generateJwtToken = (payload: any, isRefreshType: boolean = false) => {
		if (!isRefreshType)
			return jwt.sign(
				payload,
				Config?.jwtAuthentication?.authKeyToSignJWT,
				Config?.jwtAuthentication?.signOptions,
			);
		return jwt.sign(
			payload,
			Config?.jwtAuthentication?.refreshKeyToSignJWT,
			Config?.jwtAuthentication?.refreshTokenOptions,
		);
	};

	static async generatePasswordHash(traceId: string, plainTextPassword: string) {
		try {
			const hash = await bcrypt.hash(plainTextPassword, Config.encryption.salt);
			return hash;
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
		}
	}

	static async comparePasswordHash(traceId: string, plainTextPassword: string, hash: string) {
		try {
			const match = await bcrypt.compare(plainTextPassword, hash);
			return match;
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
		}
	}
}
