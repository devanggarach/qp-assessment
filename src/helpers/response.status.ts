export const DYNAMIC_REQUIRED = {
	USERNAME_LENGTH: 3,
	PASSWORD_LENGTH: 6,
};

const ERROR_CODE = {
	SERVICE_IN_MAINTENANCE: 'ooooo',
	UNKNOWN: '00000',
	SOMETHING_WENT_WRONG: '00001',
	REQUEST_NOT_ACCEPTABLE: '00002',
	USER_ALREADY_EXISTS: '00003',
	PASSWORD_NOT_MATCH: '00006',
	REQUEST_TYPE_INVALID: '00007',
	INVALID_FORMAT: '00010',
	UNAUTHORIZED_ACCESS: '00011',
	ACCESS_DENIED: '00012',
	ALREADY_EXISTS: '00027',

	DB_GET_USER_BY_EMAIL: '90001',
	DB_CREATE_USER: '90002',
	DB_GET_USER_BY_ID: '90003',
	DB_ADD_PRODUCT: '90004',
	DB_UPDATE_PRODUCT: '90005',
	DB_DELETE_PRODUCT: '90006',
	DB_FETCH_PRODUCTS: '90007',
	DB_UPDATE_STOCK: '90008',

	VALIDATION_FAILED: '00033',
};

const ERROR_NAME = {
	SERVICE_IN_MAINTENANCE: 'SERVICE_IN_MAINTENANCE',
	UNKNOWN: 'UNKNOWN',
	SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
	REQUEST_NOT_ACCEPTABLE: 'REQUEST_NOT_ACCEPTABLE',
	USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
	PASSWORD_NOT_MATCH: 'PASSWORD_NOT_MATCH',
	REQUEST_TYPE_INVALID: 'REQUEST_TYPE_INVALID',
	INVALID_FORMAT: 'INVALID_FORMAT',
	UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
	ACCESS_DENIED: 'ACCESS_DENIED',
	ALREADY_EXISTS: 'ALREADY_EXISTS',

	DB_GET_USER_BY_EMAIL: 'DB_GET_USER_BY_EMAIL',
	DB_CREATE_USER: 'DB_CREATE_USER',
	DB_GET_USER_BY_ID: 'DB_GET_USER_BY_ID',
	DB_ADD_PRODUCT: 'DB_ADD_PRODUCT',
	DB_UPDATE_PRODUCT: 'DB_UPDATE_PRODUCT',
	DB_DELETE_PRODUCT: 'DB_DELETE_PRODUCT',
	DB_FETCH_PRODUCTS: 'DB_FETCH_PRODUCTS',
	DB_UPDATE_STOCK: 'DB_UPDATE_STOCK',

	VALIDATION_FAILED: 'VALIDATION_FAILED',
};

const ERROR_DESCRIPTION = {
	SERVICE_IN_MAINTENANCE: ['Service in maintenance'],
	UNKNOWN: [
		'An unknown error occurred while processing the request',
		'An unknown error occurred while processing the request',
	],
	SOMETHING_WENT_WRONG: [
		'An unknown error occurred while processing the request',
		'An unknown error occurred while processing the request',
	],
	REQUEST_NOT_ACCEPTABLE: ['No valid authorization found', 'An OTP verification is incomplete', 'An OTP expired'],
	USER_ALREADY_EXISTS: ['User is already exists with email or phone'],
	PASSWORD_NOT_MATCH: ['Password not match, or account not exists'],
	REQUEST_TYPE_INVALID: ['Request type is invalid'],
	INVALID_FORMAT: [`Entered format invalid`],
	UNAUTHORIZED_ACCESS: [`User doesn't exists or credentials are invalid`],
	ACCESS_DENIED: ['Access Denied. Please complete necessary prerequisites before accessing'],
	ALREADY_EXISTS: ['Already Exists'],

	DB_GET_USER_BY_EMAIL: ['Error fetching user by email'],
	DB_CREATE_USER: ['Error creating user'],
	DB_GET_USER_BY_ID: ['Error fetching user by id'],
	DB_ADD_PRODUCT: ['Error on add product'],
	DB_UPDATE_PRODUCT: ['Update Product Error'],
	DB_DELETE_PRODUCT: ['Delete Product Error'],
	DB_FETCH_PRODUCTS: ['Fetch Product Error'],
	DB_UPDATE_STOCK: ['Update Stock Error'],

	VALIDATION_FAILED: ['VALIDATION_FAILED'],
};
export const ERROR_MSG = {
	SERVICE_IN_MAINTENANCE:
		'We value your time! Our team is actively working and will be back shortly. Please check back later 😊',
	UNKNOWN: 'Unkonwn error found',
	SOMETHING_WENT_WRONG: 'Hiccup! Servers tangled up. Fixing now. Check back soon',
	REQUEST_NOT_ACCEPTABLE: 'Please verify or try with valid authorization',
	USER_ALREADY_EXISTS: 'User already exists',
	UNPROCESSABLE_ENTITY: 'Invalid entity',
	DEPENDENT_API_ERROR: `Uh-oh! A small hitch with a dependent platform. We're on it! Thanks for bearing with us`,
	EMPTY_VALUE: 'Empty value',
	REQUIRED_VALUE: 'Required value',
	SHOULD_BE_STRING: 'Value should be string',
	SHOULD_BE_NUMBER: 'Value should be in number',
	SHOULD_BE_BOOLEAN: 'Value should be in boolean',
	SHOULD_BE_ALPHABET: 'Value should be alphanets only',
	SHOULD_BE_ALPHA_NUMERIC: 'Value should be alpha-numeric',
	INVALID_AUTH_TOKEN: 'Invalid auth token',
	INVALID_AUTH_CODE: 'Invalid auth code',
	PERMISSION_DENIED: 'Permission denied',
	NOT_FOUND: 'Not found',
	INVALID_ROUTE_REQUEST: 'This route is not supported',
	INVALID_VALUE: 'Invalid value',
	INVALID_NUMBER: 'Invalid number',
	//--------------------------------------------------------------
	PHONE_EXISTS: 'Phone already exists',
	UNAUTHORIZED_USER_ACCESS: `Username or password your are trying doesn't match`,
	INVALID_OTP: 'OTP is invalid or expired',
	INVALID_EMAIL: 'Invalid email',
	USERNAME_LENGTH: `Username should have at least ${DYNAMIC_REQUIRED.USERNAME_LENGTH} characters`,
	PASSWORD_LENGTH: `Password should have at least ${DYNAMIC_REQUIRED.PASSWORD_LENGTH} characters`,
	NOT_ACCEPTABLE: 'Request not accpetable please contact on support',
	INVALID_PID: 'Invalid PID',
	PASSWORD_NOT_MATCHED: 'Invalid password',
	OLD_PASSWORD_NOT_MATCHED: 'Invalid old password',
	ALREADY_EXISTS: 'Already Exits',
	PASSWORD_NOT_MATCH: 'Password not match, or account not exists',
	REQUEST_TYPE_INVALID: 'Request type is invalid',
	INVALID_FORMAT: `Entered format invalid`,
	UNAUTHORIZED_ACCESS: `User doesn't exists or credentials are invalid`,
	ACCESS_DENIED: 'Access Denied. Please complete necessary prerequisites before accessing',

	//--------------------------------------------------------------
	DB_GET_USER_BY_EMAIL: 'Error fetching user by email',
	DB_CREATE_USER: 'Error creating user',
	DB_GET_USER_BY_ID: 'Error fetching user by id',
	DB_ADD_PRODUCT: 'Error on add product',
	DB_UPDATE_PRODUCT: 'Update Product Error',
	DB_DELETE_PRODUCT: 'Delete Product Error',
	DB_FETCH_PRODUCTS: 'Fetch Product Error',
	DB_UPDATE_STOCK: 'Update Stock Error',

	VALIDATION_FAILED: 'Validation Failed',

	INVALID_PASSWORD: 'Invalid Password',

	FOUND: 'Found',
	LIMIT_UNEXPECTED_FILE: 'Unexpected file type',
	LIMIT_FILE_SIZE: 'File size limit exceed',
	UNSUPPORTED_MEDIA: 'Unsupported media file',
	AWS_UPLOAD_ERROR: 'Error occurred while trying to upload to S3 bucket',
	INVALID_FILTER: 'Invalid filter',
	INVALID_PAGE: 'Invalid page',
	INVALID_LIMIT: 'Invalid limit',

	INVALID_PRODUCT_NAME: 'Invalid product name',
	INVALID_PRODUCT_PRICE: 'Invalid product price',
	INVALID_PRODUCT_STOCK: 'Invalid product stock',
	INVALID_PRODUCT_ID: 'Invalid product id',
};

const COMMON_ERROR = {
	UNKNOWN: {
		CODE: ERROR_CODE.UNKNOWN,
		ERROR: ERROR_NAME.UNKNOWN,
		MESSAGE: ERROR_MSG.UNKNOWN,
		DESCRIPTION: ERROR_DESCRIPTION.UNKNOWN,
	},
	SOMETHING_WENT_WRONG: {
		CODE: ERROR_CODE.SOMETHING_WENT_WRONG,
		ERROR: ERROR_NAME.SOMETHING_WENT_WRONG,
		MESSAGE: ERROR_MSG.SOMETHING_WENT_WRONG,
		DESCRIPTION: ERROR_DESCRIPTION.SOMETHING_WENT_WRONG,
	},
	REQUEST_NOT_ACCEPTABLE: {
		CODE: ERROR_CODE.REQUEST_NOT_ACCEPTABLE,
		ERROR: ERROR_NAME.REQUEST_NOT_ACCEPTABLE,
		MESSAGE: ERROR_MSG.REQUEST_NOT_ACCEPTABLE,
		DESCRIPTION: ERROR_DESCRIPTION.REQUEST_NOT_ACCEPTABLE,
	},
	PASSWORD_NOT_MATCH: {
		CODE: ERROR_CODE.PASSWORD_NOT_MATCH,
		ERROR: ERROR_NAME.PASSWORD_NOT_MATCH,
		MESSAGE: ERROR_MSG.PASSWORD_NOT_MATCH,
		DESCRIPTION: ERROR_DESCRIPTION.PASSWORD_NOT_MATCH,
	},
	REQUEST_TYPE_INVALID: {
		CODE: ERROR_CODE.REQUEST_TYPE_INVALID,
		ERROR: ERROR_NAME.REQUEST_TYPE_INVALID,
		MESSAGE: ERROR_MSG.REQUEST_TYPE_INVALID,
		DESCRIPTION: ERROR_DESCRIPTION.REQUEST_TYPE_INVALID,
	},
	UNAUTHORIZED_ACCESS: {
		CODE: ERROR_CODE.UNAUTHORIZED_ACCESS,
		ERROR: ERROR_NAME.UNAUTHORIZED_ACCESS,
		MESSAGE: ERROR_MSG.UNAUTHORIZED_ACCESS,
		DESCRIPTION: ERROR_DESCRIPTION.UNAUTHORIZED_ACCESS,
	},
	ACCESS_DENIED: {
		CODE: ERROR_CODE.ACCESS_DENIED,
		ERROR: ERROR_NAME.ACCESS_DENIED,
		MESSAGE: ERROR_MSG.ACCESS_DENIED,
		DESCRIPTION: ERROR_DESCRIPTION.ACCESS_DENIED,
	},
	SERVICE_IN_MAINTENANCE: {
		CODE: ERROR_CODE.SERVICE_IN_MAINTENANCE,
		ERROR: ERROR_NAME.SERVICE_IN_MAINTENANCE,
		MESSAGE: ERROR_MSG.SERVICE_IN_MAINTENANCE,
		DESCRIPTION: ERROR_DESCRIPTION.SERVICE_IN_MAINTENANCE,
	},
	VALIDATION_FAILED: {
		CODE: ERROR_CODE.VALIDATION_FAILED,
		ERROR: ERROR_NAME.VALIDATION_FAILED,
		MESSAGE: ERROR_MSG.VALIDATION_FAILED,
		DESCRIPTION: ERROR_DESCRIPTION.VALIDATION_FAILED,
	},
};

const DB_ERROR = {
	DB_GET_USER_BY_EMAIL: {
		CODE: ERROR_CODE.DB_GET_USER_BY_EMAIL,
		ERROR: ERROR_NAME.DB_GET_USER_BY_EMAIL,
		MESSAGE: ERROR_MSG.DB_GET_USER_BY_EMAIL,
		DESCRIPTION: ERROR_DESCRIPTION.DB_GET_USER_BY_EMAIL,
	},
	DB_GET_USER_BY_ID: {
		CODE: ERROR_CODE.DB_GET_USER_BY_ID,
		ERROR: ERROR_NAME.DB_GET_USER_BY_ID,
		MESSAGE: ERROR_MSG.DB_GET_USER_BY_ID,
		DESCRIPTION: ERROR_DESCRIPTION.DB_GET_USER_BY_ID,
	},
	DB_CREATE_USER: {
		CODE: ERROR_CODE.DB_CREATE_USER,
		ERROR: ERROR_NAME.DB_CREATE_USER,
		MESSAGE: ERROR_MSG.DB_CREATE_USER,
		DESCRIPTION: ERROR_DESCRIPTION.DB_CREATE_USER,
	},
	DB_ADD_PRODUCT: {
		CODE: ERROR_CODE.DB_ADD_PRODUCT,
		ERROR: ERROR_NAME.DB_ADD_PRODUCT,
		MESSAGE: ERROR_MSG.DB_ADD_PRODUCT,
		DESCRIPTION: ERROR_DESCRIPTION.DB_ADD_PRODUCT,
	},
	DB_UPDATE_PRODUCT: {
		CODE: ERROR_CODE.DB_UPDATE_PRODUCT,
		ERROR: ERROR_NAME.DB_UPDATE_PRODUCT,
		MESSAGE: ERROR_MSG.DB_UPDATE_PRODUCT,
		DESCRIPTION: ERROR_DESCRIPTION.DB_UPDATE_PRODUCT,
	},
	DB_DELETE_PRODUCT: {
		CODE: ERROR_CODE.DB_DELETE_PRODUCT,
		ERROR: ERROR_NAME.DB_DELETE_PRODUCT,
		MESSAGE: ERROR_MSG.DB_DELETE_PRODUCT,
		DESCRIPTION: ERROR_DESCRIPTION.DB_DELETE_PRODUCT,
	},
	DB_FETCH_PRODUCTS: {
		CODE: ERROR_CODE.DB_FETCH_PRODUCTS,
		ERROR: ERROR_NAME.DB_FETCH_PRODUCTS,
		MESSAGE: ERROR_MSG.DB_FETCH_PRODUCTS,
		DESCRIPTION: ERROR_DESCRIPTION.DB_FETCH_PRODUCTS,
	},
	DB_UPDATE_STOCK: {
		CODE: ERROR_CODE.DB_UPDATE_STOCK,
		ERROR: ERROR_NAME.DB_UPDATE_STOCK,
		MESSAGE: ERROR_MSG.DB_UPDATE_STOCK,
		DESCRIPTION: ERROR_DESCRIPTION.DB_UPDATE_STOCK,
	},
};

const USER_ERROR = {
	USER_ALREADY_EXISTS: {
		CODE: ERROR_CODE.USER_ALREADY_EXISTS,
		ERROR: ERROR_NAME.USER_ALREADY_EXISTS,
		MESSAGE: ERROR_MSG.USER_ALREADY_EXISTS,
		DESCRIPTION: ERROR_DESCRIPTION.USER_ALREADY_EXISTS,
	},
	INVALID_FORMAT: {
		CODE: ERROR_CODE.INVALID_FORMAT,
		ERROR: ERROR_NAME.INVALID_FORMAT,
		MESSAGE: ERROR_MSG.INVALID_FORMAT,
		DESCRIPTION: ERROR_DESCRIPTION.INVALID_FORMAT,
	},
	ALREADY_EXISTS: {
		CODE: ERROR_CODE.ALREADY_EXISTS,
		ERROR: ERROR_NAME.ALREADY_EXISTS,
		MESSAGE: ERROR_MSG.ALREADY_EXISTS,
		DESCRIPTION: ERROR_DESCRIPTION.ALREADY_EXISTS,
	},
};

export const ERROR = {
	...DB_ERROR,
	...COMMON_ERROR,
	...USER_ERROR,
};

// ==================================================================
const COMMON_RESPONSE_MSG = {
	FOUND: 'Found',
	NOT_FOUND: 'Not found',
	UPDATED_SUCCESSFULLY: 'Updated successfully',
	UNAUTHORIZED_ACCESS: 'Unauthroized access',
	SOMETHING_WENT_WRONG: `Hiccup! Servers tangled up. Fixing now. Check back soon`,
	LIMIT_UNEXPECTED_FILE: 'Unexpected file type',
	LIMIT_FILE_SIZE: 'File size limit exceed',
	UNPROCESSABLE_ENTITY: 'Invalid entity',
	UNSUPPORTED_MEDIA: 'Unsupported media file',
	AWS_UPLOAD_ERROR: 'Error occurred while trying to upload to S3 bucket',
	DEPENDENT_API_ERROR: `Uh-oh! A small hitch with a dependent platform. We're on it! Thanks for bearing with us`,
	EMPTY_VALUE: 'Empty value',
	REQUIRED_VALUE: 'Required value',
	SHOULD_BE_STRING: 'Value should be string',
	SHOULD_BE_NUMBER: 'Value should be in number',
	SHOULD_BE_BOOLEAN: 'Value should be in boolean',
	SHOULD_BE_ALPHABET: 'Value should be alphanets only',
	SHOULD_BE_ALPHA_NUMERIC: 'Value should be alpha-numeric',
	INVALID_AUTH_TOKEN: 'Invalid auth token',
	INVALID_AUTH_CODE: 'Invalid auth code',
	PERMISSION_DENIED: 'Permission denied',
	ACCESS_DENIED: 'Access Denied. Please complete necessary prerequisites before accessing',
	INVALID_ROUTE_REQUEST: 'This route is not supported',
	MAX_API_LIMIT_RECHED: 'You reached to max request limit. Please try after sometime',
	INVALID_VALUE: 'Invalid value',
	INVALID_NUMBER: 'Invalid number',
	INVALID_UPLOAD_TYPE: 'Invalid upload file',
	FILE_UPLOADED_SUCCESS: 'File upload successfully',
	SERVICE_IN_MAINTENANCE: 'Maintenance Mode :-)',
};

const USER_RESPONSE_MSG = {
	LOGIN_SUCCESS: 'Login success',
	SIGNUP_SUCCESS: 'Account created successfully',
	FIELDS_FETCH: 'Fields fetched success',
	UPDATE_SUCCESS: 'Updated success',
	OTP_SENT_ON_PHONE: 'OTP sent on your phone',
	PASSWORD_CHANGE: 'Password changed success',
	DASHBOARD: 'Dashboard load success',
	ACCOUNT_INFO: 'Acount Info load success',
	LOGOUT: 'Logout success',
	ACCOUNT_ALREADY_EXISTS: 'This account already exists, please login',
	OTP_ALREADY_SENT: 'OTP already sent',
	INVALID_OTP: 'Invalid OTP, please enter correct One Time Password',
	USER_NOT_FOUND: 'User not found',
};

const SEED_RESPONSE_MSG = {
	LIST_OF_SEEDER_PORT_MODULE_NAMES: 'List of seeder port module names',
	PLEASE_ENTER_CORRECT_MODULE: 'Please enter correct module name in params',
	SEED_SUCCESS: 'SEED SUCCESS',
};

const ADMIN_RESPONSE_MSG = {
	LOGIN_SUCCESS: 'Login success',
	SIGNUP_SUCCESS: 'User account created success',
	FIELDS_FETCH: 'Fields fetched success',
	CREATED_SUCCESS: 'Created success',
	UPDATE_SUCCESS: 'Updated success',
	DELETE_SUCCESS: 'Deleted success',
	OTP_SENT_ON_PHONE: 'OTP sent on your phone',
	OTP_ALREADY_SENT: 'OTP already sent',
	INVALID_OTP: 'Invalid OTP, please enter correct One Time Password',
};

export const RESPONSE_MSG = {
	COMMON: COMMON_RESPONSE_MSG,
	USER: USER_RESPONSE_MSG,
	SEED: SEED_RESPONSE_MSG,
	ADMIN: ADMIN_RESPONSE_MSG,
};

// exporting to show users
export const ERROR_LIST = {
	...COMMON_ERROR,
};
