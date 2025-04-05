import { ERROR } from '../../helpers/response.status';
import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import { logger } from '../../services/logger';

import { AdminRepository } from './admin.repository';
import { OrderRepository } from '../order/order.repository';
import { AuthHelper } from '../../helpers/auth.helper';

const LOG_FILENAME = 'AdminHelper :';

export class AdminHelper {
	static readonly serviceResponse = new ServiceResponse();

	static async login(traceId: string, body: { email: string; password: string }) {
		try {
			const user = await AdminRepository.findByEmail(traceId, body.email);
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
			logger.error(error, `${LOG_FILENAME} login error`);
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

	static async addProduct(traceId: string, data: any) {
		try {
			return await OrderRepository.createProduct(traceId, data);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} addProduct error`);
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

	static async updateProduct(traceId: string, id: number, data: any) {
		try {
			return await OrderRepository.updateProduct(traceId, id, data);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} updateProduct error`);
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

	static async deleteProduct(traceId: string, id: number) {
		try {
			const result = await OrderRepository.deleteProduct(traceId, id);

			if (!result) {
				throw this.serviceResponse.notFoundError({
					traceId,
					errorCode: 'NOT_FOUND',
					message: 'Product not found',
					error: 'NOT_FOUND',
					meta: {},
				});
			}

			return result;
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} deleteProduct error`);
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

	static async listProducts(traceId: string) {
		try {
			return await OrderRepository.findAllProducts(traceId);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} listProducts error`);
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

	static async updateStock(traceId: string, id: number, data: any) {
		try {
			return await OrderRepository.updateStock(traceId, id, data);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} updateStock error`);
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
