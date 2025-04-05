import { body } from 'express-validator';
import { validateRequest } from '../../helpers/common.validator';

export const listGroceryItems = [
	body('search').optional().isString().trim().withMessage('Search must be a string'),
	body('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
	body('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
	validateRequest,
];
