import { Router } from 'express';
import { WelcomeController } from './welcome.controller';
import * as validate from './welcome.validate';

class WelcomeRoutes {
	public welcomeController: WelcomeController = new WelcomeController();
	public router: Router;
	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods() {
		this.router.post('/', validate.listGroceryItems, this.welcomeController.index);
	}
}

export default new WelcomeRoutes().router;
