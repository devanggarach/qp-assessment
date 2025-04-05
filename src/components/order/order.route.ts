import { Router } from 'express';
import * as validate from './order.validate';
import { AuthHelper } from '../../helpers/auth.helper';
import { OrderController } from './order.controller';

const ROUTE_PATH = {
	CREATE_ORDER: '/',
	LIST_ORDERS: '/',
};

class OrderRoutes {
	public router: Router;
	public orderController = new OrderController();

	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods() {
		this.router.post(
			ROUTE_PATH.CREATE_ORDER,
			AuthHelper.authValidate,
			validate.createOrder,
			this.orderController.createOrder,
		);
		this.router.get(ROUTE_PATH.LIST_ORDERS, AuthHelper.authValidate, this.orderController.listOrders);
	}
}
export default new OrderRoutes().router;
