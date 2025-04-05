import { Request, Response } from 'express';
import { logger } from '../../services/logger';
import { AdminHelper } from './admin.helper';
import { ERROR } from '../../helpers/response.status';

const LOG_FILENAME = 'AdminController :';

export class AdminController {
	login = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const { token, user } = await AdminHelper.login(traceId, req.body);
			serviceResponse.accessToken = token;
			const { passwordHash, updatedAt, ...data } = user;
			const response = serviceResponse.fetched({
				message: 'Login successful',
				data: { ...data },
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, `${LOG_FILENAME} login error`);
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

	addProduct = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const data = await AdminHelper.addProduct(traceId, req.body);
			const response = serviceResponse.created({
				message: 'Product added successfully',
				data,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'adminController.addProduct error');
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

	updateProduct = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const data = await AdminHelper.updateProduct(traceId, Number(req.params.id), req.body);
			const response = serviceResponse.updated({
				message: 'Product updated successfully',
				data,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'adminController.updateProduct error');
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

	deleteProduct = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			await AdminHelper.deleteProduct(traceId, Number(req.params.id));
			const response = serviceResponse.success({
				message: 'Product deleted successfully',
				data: {},
			});
			res.status(response.statusCode).json(response);
			return;
		} catch (error: any) {
			logger.error(error, 'adminController.deleteProduct error');
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

	listProducts = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const data = await AdminHelper.listProducts(traceId);
			const response = serviceResponse.fetched({
				message: 'Product list fetched successfully',
				data,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'adminController.listProducts error');
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

	updateStock = async (req: Request, res: Response) => {
		const serviceResponse = req.serviceResponse;
		const traceId = serviceResponse.traceId;
		try {
			const data = await AdminHelper.updateStock(traceId, Number(req.params.id), req.body);
			const response = serviceResponse.updated({
				message: 'Stock updated successfully',
				data,
			});
			res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'adminController.updateStock error');
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
