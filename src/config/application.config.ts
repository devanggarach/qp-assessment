import { Application } from 'express';
import WelcomeRoute from '../components/welcome/welcome.route';
import UserRoute from '../components/user/user.route';
import AdminRoute from '../components/admin/admin.route';
import OrderRoute from '../components/order/order.route';
import DevRoute from '../dev/dev.route';

const ROUTE_PATH = {
	WELCOME: `/`,
	USER: `/user`,
	CONFIG: `/config`,
	DEV: `/dev`,
	COMMUNICATION: '/communication',
	ADMIN: `/admin`,
	ORDER: '/order',
};

export class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use(ROUTE_PATH.WELCOME, WelcomeRoute);
		app.use(ROUTE_PATH.USER, UserRoute);
		app.use(ROUTE_PATH.ADMIN, AdminRoute);
		app.use(ROUTE_PATH.ORDER, OrderRoute);
		app.use(ROUTE_PATH.DEV, DevRoute);
	}
}
