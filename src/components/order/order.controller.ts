import { Request, Response } from 'express';
import { ERROR } from '../../helpers/response.status';
import { logger } from '../../services/logger';
import { OrderHelper } from './order.helper';

const LOG_FILENAME = 'OrderController :';

export class OrderController {
	createOrder = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const responseData = await OrderHelper.createOrder(traceId, req.user.id, req.body);
			const response = serviceResponse.fetched({
				message: 'Order created successfully',
				data: responseData,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'OrderController.createOrder error');
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

	listOrders = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			logger.info({ user: req.user }, 'check');
			const orders = await OrderHelper.listOrders(traceId, req.user.id);
			logger.info({ orders }, 'orders');
			const response = serviceResponse.fetched({
				message: 'Orders fetched successfully',
				data: orders,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'OrderController.listOrders error');
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
