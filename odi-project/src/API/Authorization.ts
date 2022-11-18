import axios from 'axios';

import { IAuthentication, ISignupResponse } from '@/types/interfaces';
import { BASE_URL } from './consts';

export class AuthToAPI {
	path: string;

	constructor() {
		this.path = 'auth/';
	}

	async signup(name: string, login: string, pass: string): Promise<ISignupResponse> {
		const res = await axios.post(`${BASE_URL}${this.path}signup`, {
			name: `${name}`,
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}

	async signin(login: string, pass: string): Promise<IAuthentication> {
		const res = await axios.post(`${BASE_URL}${this.path}signin`, {
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}
}
