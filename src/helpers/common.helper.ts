import { ServiceResponse } from './serviceResponse.helper';

export class CommonHelper {
	static readonly serviceResponse = new ServiceResponse();

	static readonly getTrim = (data: any) => {
		return !this.empty(data) && typeof data === 'string' ? data.trim() : data;
	};

	static readonly empty = (data: any) => {
		if (
			[undefined, 'undefined', null, 'null', ''].includes(data) ||
			(typeof data === 'object' && Object?.keys(data)?.length === 0)
		)
			return true;
		return typeof data === 'string' && !data.trim().length;
	};
}
