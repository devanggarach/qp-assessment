import path from 'path';
import { retrieveSecrets } from './services/credentials';

// File path
export const BASE_DIR_PATH = path.join(process.cwd(), '/dist');

export let Config: any = {};

export async function setEnvVariables(): Promise<void> {
	const envVariables = await retrieveSecrets();
	const REQUIRED_ENV_KEYS = [
		'APP_NAME',
		'APP_MODE',
		'APP_TYPE',
		'PORT',
		'AUTH_KEY',
		'ENCRYPTION_SALT',
		'DATABASE_URL',
		'TZ',
	];

	if (!envVariables || typeof envVariables !== 'object') {
		console.error('retrieveSecrets did not return an object.');
		process.exit(0);
	}

	const missingKeys = REQUIRED_ENV_KEYS.filter(key => !envVariables[key] || envVariables[key] === '');

	if (missingKeys.length > 0) {
		console.error(`Missing required environment variables: ${missingKeys.join(', ')}`);
		process.exit(0);
	}

	const cleanBase64 = (str: string | undefined) => (str ? str.replace(/(\r\n|\n|\r|\s)/gm, '') : '');

	const authKeyBase64 = cleanBase64(envVariables.AUTH_KEY);
	const authKeyBuff = Buffer.from(authKeyBase64, 'base64');
	const authKey = authKeyBuff.toString('utf8');
	const appConfig = {
		appName: (envVariables?.APP_NAME ?? '').trim(),
		appNameStatic: (envVariables?.APP_NAME ?? '').trim().replace(/\s+/g, '-').toLowerCase(),
		jwtAuthentication: {
			authKeyToSignJWT: authKey, // use this to jwt auth token
			signOptions: {
				// algorithm: 'RS256',
				expiresIn: '1h', // 1 hour
			},
			defaultOptions: {
				algorithm: 'RS256',
			},
		},
		server: {
			port: parseInt(envVariables.PORT, 10),
			dbConnectionUrl: envVariables.DATABASE_URL,
			appMode: envVariables.APP_MODE,
			appType: envVariables.APP_TYPE,
			masterOtp: envVariables.MASTER_OTP,
			masterPassword: envVariables.MASTER_PASSWORD || '',
			corsOrigin: envVariables?.CORS_ORIGIN?.split(','),
		},
		/** Must be 256 bits (32 characters) */
		encryption: {
			salt: parseInt(envVariables.ENCRYPTION_SALT),
		},
		avatar: {
			url: 'https://api.dicebear.com/9.x/fun-emoji/svg?mouth=wideSmile&seedplaincute,smileTeeth,smileLol,tongueOut,lilSmile=',
		},
		timezone: envVariables.TZ || 'Asia/Kolkata',
		XFLUTTERAPP: 'x-flutter-app',
	};
	Object.assign(Config, appConfig);
}
