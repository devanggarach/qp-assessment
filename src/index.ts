import { setEnvVariables } from './config';
import dotenv from 'dotenv';
dotenv.config();

async function start(): Promise<void> {
	try {
		await setEnvVariables();
		const { App } = await import('./app');
	} catch (error) {
		console.error('Error during start:', error);
		process.exit(1); // Exit with error code
	}
}

start();
