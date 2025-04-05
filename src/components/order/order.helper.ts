import { ERROR } from '../../helpers/response.status';
import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import { logger } from '../../services/logger';
import { OrderRepository } from './order.repository';

const LOG_FILENAME = 'UserHelper :';

export class OrderHelper {
	static readonly serviceResponse = new ServiceResponse();

	static async createOrder(traceId: string, userId: number, data: any) {
		try {
			logger.info({ userId, data }, 'useriddata');
			return await OrderRepository.createOrder(traceId, userId, data);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} createOrder error`);
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

	static async listOrders(traceId: string, userId: number) {
		try {
			return await OrderRepository.findOrdersByUser(traceId, userId);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} listOrders error`);
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
