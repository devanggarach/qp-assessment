import { body } from 'express-validator';
import { validateRequest } from '../../helpers/common.validator';

export const createOrder = [
	body('items').isArray({ min: 1 }).withMessage('Items are required'),
	body('items.*.groceryItemId').isInt({ gt: 0 }).withMessage('Grocery Item ID must be a valid number'),
	body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive number'),
	validateRequest,
];
