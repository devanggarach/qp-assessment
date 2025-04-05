import { Router } from 'express';
import { AdminController } from './admin.controller';
import * as validate from './admin.validate';
import { AuthHelper } from '../../helpers/auth.helper';
import { WelcomeController } from '../../components/welcome/welcome.controller';

const ROUTE_PATH = {
	LOGIN: '/login',
	ADD_PRODUCT: '/product',
	UPDATE_PRODUCT: '/product/:id',
	DELETE_PRODUCT: '/product/:id',
	LIST_PRODUCTS: '/products',
	UPDATE_STOCK: '/product/:id/stock',
};

class AdminRoutes {
	public router: Router;
	public adminController = new AdminController();
	public welcomeController = new WelcomeController();
	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods() {
		this.router.post(ROUTE_PATH.LOGIN, validate.login, this.adminController.login);

		this.router.post(
			ROUTE_PATH.ADD_PRODUCT,
			AuthHelper.adminAuthValidate,
			validate.addProduct,
			this.adminController.addProduct,
		);

		this.router.put(
			ROUTE_PATH.UPDATE_PRODUCT,
			AuthHelper.adminAuthValidate,
			validate.updateProduct,
			this.adminController.updateProduct,
		);

		this.router.delete(ROUTE_PATH.DELETE_PRODUCT, AuthHelper.adminAuthValidate, this.adminController.deleteProduct);

		this.router.post(ROUTE_PATH.LIST_PRODUCTS, AuthHelper.adminAuthValidate, this.welcomeController.index);

		this.router.patch(
			ROUTE_PATH.UPDATE_STOCK,
			AuthHelper.adminAuthValidate,
			validate.updateStock,
			this.adminController.updateStock,
		);
	}
}

export default new AdminRoutes().router;
