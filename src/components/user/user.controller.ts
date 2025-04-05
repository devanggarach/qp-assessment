import { Request, Response } from 'express';
import { ERROR } from '../../helpers/response.status';
import { logger } from '../../services/logger';
import { UserHelper } from './user.helper';

const LOG_FILENAME = 'UserController :';

export class UserController {
	create = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;

		try {
			const responseData = await UserHelper.registerUser(traceId, req.body);
			const response = serviceResponse.created({
				message: 'User registered successfully',
				data: responseData,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'userController.create error');
			if (error?.statusCode) return res.status(error.statusCode).json(error);
			const exception = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			res.status(exception.statusCode).json(exception);
		}
	};

	login = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;

		try {
			const { token, user } = await UserHelper.loginUser(traceId, req.body);
			serviceResponse.accessToken = token;
			const { passwordHash, updatedAt, ...data } = user;
			const response = serviceResponse.fetched({
				message: 'Login successful',
				data: { ...data },
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'userController.login error');
			if (error?.statusCode) return res.status(error.statusCode).json(error);
			const exception = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			res.status(exception.statusCode).json(exception);
		}
	};

	profile = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		let user = req.user;

		try {
			const response = serviceResponse.fetched({
				message: 'Profile fetched',
				data: user,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'userController.profile error');
			if (error?.statusCode) return res.status(error.statusCode).json(error);
			const exception = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			res.status(exception.statusCode).json(exception);
		}
	};
}
