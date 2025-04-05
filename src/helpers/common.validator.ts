import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { logger } from '../services/logger';
import { ServiceResponse } from './serviceResponse.helper';
import { ERROR } from './response.status';

const serviceResponse = new ServiceResponse();

export function idParamValidator(id = 'id'): any {
	return param(id).not().isEmpty().withMessage({ error_code: 'EMPTY_VALUE' }).bail().isMongoId().withMessage({
		error_code: 'INVALID_ID',
	});
}

export function userIdParamValidator(userId = 'userId'): any {
	return param(userId).not().isEmpty().withMessage({ error_code: 'EMPTY_VALUE' }).bail().isMongoId().withMessage({
		error_code: 'INVALID_ID',
	});
}

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const traceId = req.serviceResponse.traceId;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			logger.error(errors.array(), 'Validation Error');
			const formatted = errors.array().map((err: any) => ({
				field: err.param,
				message: err.msg,
			}));
			throw serviceResponse.unprocessableEntityError({
				errorCode: ERROR.VALIDATION_FAILED.CODE,
				message: ERROR.VALIDATION_FAILED.MESSAGE,
				error: ERROR.VALIDATION_FAILED.ERROR,
				meta: formatted,
			});
		}
		next();
	} catch (error: any) {
		if (error?.statusCode) {
			res.status(error?.statusCode).json({ ...error, traceId });
			return;
		}
		const exception = req.serviceResponse.unprocessableEntityError({
			errorCode: ERROR.VALIDATION_FAILED.CODE,
			message: ERROR.VALIDATION_FAILED.MESSAGE,
			error: ERROR.VALIDATION_FAILED.ERROR,
			meta: {},
		});
		return res.status(exception.statusCode).json(exception);
	}
};
