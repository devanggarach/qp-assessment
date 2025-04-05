import { body, param } from 'express-validator';
import { DYNAMIC_REQUIRED, ERROR_MSG } from '../../helpers/response.status';
import { validateRequest } from '../../helpers/common.validator';

export const login = [
	body('email').isEmail().withMessage(ERROR_MSG.INVALID_EMAIL),
	body('password').isLength({ min: DYNAMIC_REQUIRED.PASSWORD_LENGTH }).withMessage(ERROR_MSG.INVALID_PASSWORD),
	validateRequest,
];

export const addProduct = [
	body('name').isString().notEmpty().withMessage(ERROR_MSG.INVALID_PRODUCT_NAME),
	body('price').isDecimal().withMessage(ERROR_MSG.INVALID_PRODUCT_PRICE),
	body('stock').isInt({ min: 0 }).withMessage(ERROR_MSG.INVALID_PRODUCT_STOCK),
	validateRequest,
];

export const updateProduct = [
	param('id').isInt().withMessage(ERROR_MSG.INVALID_PRODUCT_ID),
	body('name').optional().isString().withMessage(ERROR_MSG.INVALID_PRODUCT_NAME),
	body('price').optional().isDecimal().withMessage(ERROR_MSG.INVALID_PRODUCT_PRICE),
	body('stock').optional().isInt({ min: 0 }).withMessage(ERROR_MSG.INVALID_PRODUCT_STOCK),
	validateRequest,
];

export const deleteProduct = [param('id').isInt().withMessage(ERROR_MSG.INVALID_PRODUCT_ID), validateRequest];

export const updateStock = [
	param('id').isInt().withMessage(ERROR_MSG.INVALID_PRODUCT_ID),
	body('stock').isInt({ min: 0 }).withMessage(ERROR_MSG.INVALID_PRODUCT_STOCK),
	validateRequest,
];

export const listProducts = [];
