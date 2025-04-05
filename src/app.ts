import http from 'http';
import { cpus } from 'os';
import path from 'path';
import cluster from 'cluster';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import useragent from 'express-useragent';
import { pinoHttp } from 'pino-http';
import { incomingLog, logger } from './services/logger';
import helmet, { frameguard } from 'helmet';
import gracefulShutdown from 'http-graceful-shutdown';
import { BASE_DIR_PATH, Config } from './config';
import { ApplicationConfig } from './config/application.config';
import prisma, { DbHelper } from './prisma/db.helper';
import { IAdmin } from './components/admin/admin.dto';
import { IUser } from './components/user/user.dto';
import { ServiceResponse } from './helpers/serviceResponse.helper';
import cors from 'cors';

const LOG_FILENAME = `App`;

declare global {
	namespace Express {
		export interface Request {
			user: IUser | IAdmin;
			serviceResponse: any;
			skipLogging: boolean;
		}
	}
}

dotenv.config();

const PORT: number = Config.server.port;
const ROUTES_TO_SKIP_LOG = ['/image', '/document'];

export class App {
	public app: express.Application;
	public connections: any = new Map();
	public roomNames: Set<string> = new Set();

	private async shutdownConnection(): Promise<void> {
		logger.info({}, 'connection start to close');
		await DbHelper.closePostgresClient();
		logger.info({}, 'connection closed.');
	}

	private finalFunction(): void {
		logger.info({}, 'server shut down');
	}

	constructor() {
		this.app = express();
		const server = http.createServer(this.app);
		server.listen(PORT, () => {
			logger.info({}, `Server is running on port: ${PORT}`);
		});

		this.config();
		gracefulShutdown(server, {
			signals: 'SIGINT SIGTERM',
			timeout: 100000,
			development: false,
			forceExit: true,
			onShutdown: this.shutdownConnection,
			finally: this.finalFunction,
		});
	}

	private config(): void {
		this.app.set('trust proxy', 1);
		this.app.use(useragent.express());
		this.app.use(cors());
		this.app.use(frameguard({ action: 'deny' }), helmet.hidePoweredBy());
		this.app.use(express.static(__dirname + '/media'));
		this.app.use(function (req: Request, res: Response, next: NextFunction) {
			if (ROUTES_TO_SKIP_LOG.some(route => req.url.startsWith(route))) req.skipLogging = true;
			req.serviceResponse = new ServiceResponse(req, res);
			next();
		});
		this.app.use(incomingLog);
		this.app.use(pinoHttp({ logger, autoLogging: { ignore: (req: Request) => req.skipLogging === true } }));
		this.app.use(express.json({ limit: 100 * 100000 }));
		this.app.use(express.urlencoded({ extended: false, limit: 100 * 100000 }));

		ApplicationConfig.registerRoute(this.app);
		this.app.use(express.static(path.join(BASE_DIR_PATH, '../media')));
		this.app.get('/healthCheck', (req: Request, res: Response) => {
			res.send({});
		});
	}
}

async function prismaSetup(): Promise<void> {
	try {
		await prisma.$connect();
		logger.info({}, 'DATABASE - Connected (PostgreSQL)');
	} catch (error) {
		logger.error({ error }, 'DATABASE - Connection Error (PostgreSQL)');
		process.exit(1);
	}
}

let appInstance: App;

async function startApp() {
	await prismaSetup();
	const numCPUs = cpus().length;

	if (Config.server.appType && Config.server.appType === 'cluster') {
		if (cluster.isPrimary && numCPUs > 1) {
			logger.info({}, `Master ${process.pid} is running`);
			for (let i = 0; i < numCPUs; i += 1) {
				cluster.fork();
			}
			cluster.on('online', worker => {
				logger.info({}, `Worker ${worker.process.pid} is online.`);
			});
			cluster.on('exit', (worker, code, signal) => {
				logger.error({}, `Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
				cluster.fork();
			});
		} else {
			appInstance = new App();
		}
	} else {
		appInstance = new App();
	}
}

startApp();

export { appInstance };
