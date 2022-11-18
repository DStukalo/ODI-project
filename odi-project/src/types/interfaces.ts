import { TDataResponseSignup } from './types';

export interface IAuthentication {
	data: {
		token: string;
	};
	status: number;
}

export interface ISignupResponse {
	data: TDataResponseSignup;
	status: number;
}
