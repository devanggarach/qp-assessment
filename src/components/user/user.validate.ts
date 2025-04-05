import { body } from 'express-validator';
import { ERROR_MSG, DYNAMIC_REQUIRED } from '../../helpers/response.status';
import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import { validateRequest } from '../../helpers/common.validator';

const serviceResponse = new ServiceResponse();

export const create = [
	body('email').notEmpty().withMessage(ERROR_MSG.EMPTY_VALUE).bail().isEmail().withMessage(ERROR_MSG.INVALID_EMAIL),
	body('password')
		.notEmpty()
		.withMessage(ERROR_MSG.EMPTY_VALUE)
		.bail()
		.isLength({ min: DYNAMIC_REQUIRED.PASSWORD_LENGTH })
		.withMessage(ERROR_MSG.INVALID_PASSWORD),
	validateRequest,
];

export const login = [
	body('email')
		.notEmpty()
		.withMessage(ERROR_MSG.EMPTY_VALUE)
		.bail()
		.isString()
		.withMessage(ERROR_MSG.SHOULD_BE_STRING),
	body('password')
		.notEmpty()
		.withMessage(ERROR_MSG.EMPTY_VALUE)
		.bail()
		.isString()
		.withMessage(ERROR_MSG.SHOULD_BE_STRING),
	validateRequest,
];
