import { Request, Response } from 'express';
import { logger } from '../../services/logger';
import { AuthHelper } from '../../helpers/auth.helper';
import { CommonHelper } from '../../helpers/common.helper';
import { COMPONENT_NAME } from '../../helpers/common.token';
import { ERROR, RESPONSE_MSG } from '../../helpers/response.status';
import prisma from '../../prisma/db.helper';
import { faker } from '@faker-js/faker';

const LOG_FILENAME = 'SeedController :';
const defaultPassword = '123456';

export class SeedController {
	/** Request body verification */
	index = async (req: Request, res: Response) => {
		const { serviceResponse } = req;
		try {
			let module = req?.params?.module;
			if (CommonHelper.empty(module)) {
				return res.status(200).json({
					status: 'SUCCESS',
					message: RESPONSE_MSG.SEED.LIST_OF_SEEDER_PORT_MODULE_NAMES,
					modules: Object.values(COMPONENT_NAME),
				});
			}

			module = module.toLowerCase();

			switch (module) {
				case COMPONENT_NAME.ADMIN:
					for (let i = 0; i < Number(req?.query?.query ?? 50); i++) {
						const email = faker.internet.email().toLowerCase();
						const passwordHash = await AuthHelper.generatePasswordHash('seeder', defaultPassword);

						await prisma.admin.create({
							data: {
								email,
								passwordHash,
							},
						});
					}
					break;

				case COMPONENT_NAME.USER:
					for (let i = 0; i < Number(req?.query?.query ?? 50); i++) {
						const email = faker.internet.email().toLowerCase();
						const passwordHash = await AuthHelper.generatePasswordHash('seeder', defaultPassword);

						await prisma.user.create({
							data: {
								email,
								passwordHash,
							},
						});
					}
					break;

				default:
					return res.status(200).json({
						status: 'SUCCESS',
						message: RESPONSE_MSG.SEED.PLEASE_ENTER_CORRECT_MODULE,
						modules: Object.values(COMPONENT_NAME),
					});
			}

			const response = serviceResponse.created({
				data: { module },
				message: RESPONSE_MSG.SEED.SEED_SUCCESS,
			});

			return res.status(response.statusCode).json(response);
		} catch (error: any) {
			logger.error(error, LOG_FILENAME);
			const exception = serviceResponse.unhandledError({
				errorCode: ERROR.SOMETHING_WENT_WRONG.CODE,
				message: ERROR.SOMETHING_WENT_WRONG.MESSAGE,
				error: error.message || ERROR.SOMETHING_WENT_WRONG.ERROR,
				meta: error,
			});
			return res.status(exception?.statusCode).json(exception);
		}
	};
}
