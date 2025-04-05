// express.d.ts
import { IAdmin } from 'components/admin/admin.dto';
import { IUser } from 'components/user/user.dto';
import express, { Request, Response } from 'express';

declare global {
	namespace Express {
		export interface Request {
			user: IUser | IAdmin;
			serviceResponse: any;
			skipLogging: boolean;
		}
	}
}
