import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DbHelper {
	static async closePostgresClient(): Promise<void> {
		try {
			await prisma.$disconnect();
			console.log('DATABASE - connection closed (PostgreSQL)');
		} catch (error) {
			console.error('Error closing PostgreSQL connection:', error);
		}
	}
}

export default prisma;
