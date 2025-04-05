import { Request, Response } from 'express';
import { logger } from '../../services/logger';
import { WelcomeHelper } from './welcome.helper';

const LOG_FILENAME = 'WelcomeController :';

export class WelcomeController {
	/** Request body verification */
	index = async (req: Request, res: Response) => {
		const { serviceResponse } = req;
		const traceId = serviceResponse.traceId;
		try {
			let { page, limit, search, orderBy, orderDirection, isAvailable } = req.body;
			page = Number(page) || 1;
			limit = Number(limit) || 10;
			search = typeof search === 'string' ? search : '';
			orderBy = orderBy?.trim() || 'name';
			orderDirection = orderDirection?.toLowerCase() === 'desc' ? 'desc' : 'asc';
			const result = await WelcomeHelper.listGroceryItems(traceId, {
				page,
				limit,
				search,
				orderBy,
				orderDirection,
				isAvailable,
			});

			const response = serviceResponse.fetched({
				data: result,
				message: 'Grocery items fetched successfully',
			});

			return res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, 'GroceryController::listGroceryItemsForUser');
			const exception = serviceResponse.unhandledError({
				message: 'Failed to fetch grocery items',
				meta: error,
			});
			return res.status(exception.statusCode).json(exception);
		}
	};
}
