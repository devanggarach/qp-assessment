export interface IAdmin {
	id: number;
	email: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
	orders: any;
}

export type TIAdminOrNull = null | IAdmin;
