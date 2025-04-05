import { ERROR } from '../../helpers/response.status';
import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import { logger } from '../../services/logger';
import prisma from '../../prisma/db.helper';
import { Prisma } from '@prisma/client';

const LOG_FILENAME = 'UserHelper :';

interface ListGroceryParams {
	page?: number;
	limit?: number;
	search?: string;
	orderBy?: keyof Prisma.GroceryItemOrderByWithRelationInput;
	orderDirection?: 'asc' | 'desc';
	isAvailable?: '';
}

export class WelcomeHelper {
	static readonly serviceResponse = new ServiceResponse();

	static readonly listGroceryItems = async (
		traceId: string,
		{
			page = 1,
			limit = 10,
			search = '',
			orderBy = 'name',
			orderDirection = 'asc',
			isAvailable = '',
		}: ListGroceryParams,
	) => {
		try {
			const skip = (page - 1) * limit;

			const where: Prisma.GroceryItemWhereInput = {
				...(isAvailable !== '' && isAvailable !== undefined && isAvailable !== null
					? { isAvailable: isAvailable === true || isAvailable === 'true' }
					: {}),
				...(search && {
					name: {
						contains: search,
						mode: 'insensitive',
					},
				}),
			};

			const [items, totalProducts] = await Promise.all([
				prisma.groceryItem.findMany({
					where,
					skip,
					take: limit,
					orderBy: {
						[orderBy]: orderDirection,
					},
				}),
				prisma.groceryItem.count({ where }),
			]);

			const totalPages = Math.ceil(totalProducts / limit);
			const responseData = {
				products: items,
				pagination: {
					page,
					limit,
					totalProducts,
					totalPages,
					hasNextPage: page < totalPages,
					hasPreviousPage: page > 1,
				},
			};
			return responseData;
		} catch (error) {
			logger.error(error, `${LOG_FILENAME} list products error`);
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
		}
	};
}
