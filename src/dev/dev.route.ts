import { Router } from 'express';
import { SeedController } from './seed/seed.controller';

const ROUTE_PATH = {
	SEED: '/seed',
	PARAM_MODULE: '/:module',
	MAINTENANCE: '/maintenance',
};

class DevRoutes {
	public seedController: SeedController = new SeedController();
	public router: Router;
	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods() {
		// migration routes will be written here
		this.router.get(`${ROUTE_PATH.SEED}`, this.seedController.index);
		this.router.get(`${ROUTE_PATH.SEED}${ROUTE_PATH.PARAM_MODULE}`, this.seedController.index);
	}
}

export default new DevRoutes().router;
