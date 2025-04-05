export interface CreateUserDto {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface UserProfileDto {
	id: number;
	email: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUser {
	id: number;
	email: string;
	passwordHash: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	createdAt: Date;
	updatedAt: Date;
	orders: any;
}

export type TIUserOrNull = null | IUser;
