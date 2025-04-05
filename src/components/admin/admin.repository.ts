import { ServiceResponse } from '../../helpers/serviceResponse.helper';
import prisma from '../../prisma/db.helper';
import { ERROR } from '../../helpers/response.status';

export class AdminRepository {
	static readonly serviceResponse = new ServiceResponse();

	static async findByEmail(traceId: string, email: string) {
		try {
			return await prisma.admin.findUnique({ where: { email } });
		} catch (error) {
			throw this.serviceResponse.unhandledError({
				traceId,
				errorCode: ERROR.DB_GET_USER_BY_EMAIL.CODE,
				message: ERROR.DB_GET_USER_BY_EMAIL.MESSAGE,
				error: ERROR.DB_GET_USER_BY_EMAIL.ERROR,
				meta: error,
			});
		}
	}

	static async findById(traceId: string, id: number) {
		try {
			return await prisma.admin.findUnique({ where: { id } });
		} catch (error) {
			throw this.serviceResponse.databaseError({
				traceId,
				errorCode: ERROR.DB_GET_USER_BY_ID.CODE,
				message: ERROR.DB_GET_USER_BY_ID.MESSAGE,
				error: ERROR.DB_GET_USER_BY_ID.ERROR,
				meta: error,
			});
		}
	}
}
