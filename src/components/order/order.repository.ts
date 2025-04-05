import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import prisma from '../../prisma/db.helper';
import { ERROR } from '../../helpers/response.status';
import { logger } from '../../services/logger';

export class OrderRepository {
	static readonly serviceResponse = new ServiceResponse();

	static async createProduct(traceId: string, data: any) {
		try {
			return await prisma.groceryItem.create({ data });
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_ADD_PRODUCT.CODE,
				message: ERROR.DB_ADD_PRODUCT.MESSAGE,
				error: ERROR.DB_ADD_PRODUCT.ERROR,
				meta: error,
			});
		}
	}

	static async updateProduct(traceId: string, id: number, data: any) {
		try {
			return await prisma.groceryItem.update({ where: { id }, data });
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_UPDATE_PRODUCT.CODE,
				message: ERROR.DB_UPDATE_PRODUCT.MESSAGE,
				error: ERROR.DB_UPDATE_PRODUCT.ERROR,
				meta: error,
			});
		}
	}

	static async deleteProduct(traceId: string, id: number) {
		try {
			const product = await prisma.groceryItem.findUnique({ where: { id } });
			if (!product) return null;
			return await prisma.groceryItem.delete({ where: { id } });
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_DELETE_PRODUCT.CODE,
				message: ERROR.DB_DELETE_PRODUCT.MESSAGE,
				error: ERROR.DB_DELETE_PRODUCT.ERROR,
				meta: error,
			});
		}
	}

	static async findAllProducts(traceId: string) {
		try {
			return await prisma.groceryItem.findMany();
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_FETCH_PRODUCTS.CODE,
				message: ERROR.DB_FETCH_PRODUCTS.MESSAGE,
				error: ERROR.DB_FETCH_PRODUCTS.ERROR,
				meta: error,
			});
		}
	}

	static async updateStock(traceId: string, id: number, data: any) {
		try {
			return await prisma.groceryItem.update({ where: { id }, data });
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_UPDATE_STOCK.CODE,
				message: ERROR.DB_UPDATE_STOCK.MESSAGE,
				error: ERROR.DB_UPDATE_STOCK.ERROR,
				meta: error,
			});
		}
	}

	static async createOrder(traceId: string, userId: number, orderData: any) {
		try {
			const productIds = orderData.items.map((item: any) => item.groceryItemId);

			const groceryItems = await prisma.groceryItem.findMany({
				where: {
					id: { in: productIds },
					isAvailable: true,
				},
			});

			if (groceryItems.length !== productIds.length) {
				throw this.serviceResponse.badRequestError({
					traceId,
					errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
					message: 'One or more grocery items not found or unavailable.',
					error: ERROR.SOMETHING_WENT_WRONG.ERROR,
					meta: {},
				});
			}

			let totalAmount = 0;

			const orderItems = orderData.items.map((item: any) => {
				const dbItem = groceryItems.find(g => g.id === item.groceryItemId);

				if (!dbItem) {
					throw this.serviceResponse.badRequestError({
						traceId,
						errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
						message: `Product with ID ${item.groceryItemId} not found.`,
						error: ERROR.SOMETHING_WENT_WRONG.ERROR,
						meta: { groceryItemId: item.groceryItemId },
					});
				}

				if (dbItem.stock < item.quantity) {
					throw this.serviceResponse.badRequestError({
						traceId,
						errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
						message: `Insufficient stock for product "${dbItem.name}".`,
						error: ERROR.SOMETHING_WENT_WRONG.ERROR,
						meta: {
							groceryItemId: dbItem.id,
							availableStock: dbItem.stock,
							requestedQuantity: item.quantity,
						},
					});
				}

				const unitPrice = Number(dbItem.price);
				const totalPrice = unitPrice * item.quantity;

				totalAmount += totalPrice;

				return {
					groceryItemId: item.groceryItemId,
					quantity: item.quantity,
					unitPrice,
					totalPrice,
				};
			});

			return await prisma.$transaction(async tx => {
				const order = await tx.order.create({
					data: {
						userId,
						totalAmount,
						items: {
							create: orderItems,
						},
					},
					include: {
						items: {
							include: {
								groceryItem: true,
							},
						},
					},
				});

				await Promise.all(
					orderItems.map((item: any) =>
						tx.groceryItem.update({
							where: { id: item.groceryItemId },
							data: {
								stock: {
									decrement: item.quantity,
								},
							},
						}),
					),
				);

				return order;
			});
		} catch (error) {
			logger.error(error, 'OrderRepository.createOrder error');
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
		}
	}

	static async findOrdersByUser(traceId: string, userId: number) {
		try {
			return await prisma.order.findMany({
				where: { userId },
				include: {
					items: {
						include: {
							groceryItem: true,
						},
					},
				},
			});
		} catch (error) {
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
