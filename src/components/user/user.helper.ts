import { ERROR } from '../../helpers/response.status';
import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import { logger } from '../../services/logger';
import { UserRepository } from './user.repository';
import { AuthHelper } from '../../helpers/auth.helper';

const LOG_FILENAME = 'UserHelper :';

export class UserHelper {
	static readonly serviceResponse = new ServiceResponse();

	static async registerUser(traceId: string, body: any) {
		try {
			const existingUser = await UserRepository.findByEmail(traceId, body.email);
			if (existingUser) {
				throw this.serviceResponse.conflictError({
					traceId,
					errorCode: ERROR.USER_ALREADY_EXISTS.CODE,
					message: ERROR.USER_ALREADY_EXISTS.MESSAGE,
					error: ERROR.USER_ALREADY_EXISTS.ERROR,
					meta: {},
				});
			}

			body.passwordHash = await AuthHelper.generatePasswordHash(traceId, body.password);
			delete body.password;

			return await UserRepository.createUser(traceId, body);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} registerUser error`);
			if (error?.statusCode) throw error;
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
		}
	}

	static async loginUser(traceId: string, body: any) {
		try {
			const user = await UserRepository.findByEmail(traceId, body.email);
			if (!user || !(await AuthHelper.comparePasswordHash(traceId, body.password, user.passwordHash))) {
				throw this.serviceResponse.forbiddenError({
					traceId,
					errorCode: ERROR.PASSWORD_NOT_MATCH.CODE,
					message: ERROR.PASSWORD_NOT_MATCH.MESSAGE,
					error: ERROR.PASSWORD_NOT_MATCH.ERROR,
					meta: {},
				});
			}

			const token = AuthHelper.generateJwtToken({ id: user.id, email: user.email });
			return { token, user };
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} loginUser error`);
			if (error?.statusCode) throw error;
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
