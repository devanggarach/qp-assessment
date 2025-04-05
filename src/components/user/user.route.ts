import { Router } from 'express';
import { UserController } from './user.controller';
import * as validate from './user.validate';
import { AuthHelper } from '../../helpers/auth.helper';

const ROUTE_PATH = {
	REGISTER: '/register',
	LOGIN: '/login',
	PROFILE: '/profile',
};

class UserRoutes {
	public router: Router;
	public userController = new UserController();
	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods() {
		this.router.post(ROUTE_PATH.REGISTER, validate.create, this.userController.create);
		this.router.post(ROUTE_PATH.LOGIN, validate.login, this.userController.login);
		this.router.get(ROUTE_PATH.PROFILE, AuthHelper.authValidate, this.userController.profile);
	}
}

export default new UserRoutes().router;
