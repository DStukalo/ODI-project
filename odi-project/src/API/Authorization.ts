import axios from 'axios';

import { AuthenticationData, UserDataWithStatus } from '@/types/interfaces';
import { BASE_URL } from './consts';

class AuthToAPI {
	public path: string;

	constructor(path = '/') {
		this.path = path;
	}

	async signup(name: string, login: string, pass: string): Promise<UserDataWithStatus> {
		const res = await axios.post(`${BASE_URL}${this.path}signup`, {
			name: `${name}`,
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}

	async signin(login: string, pass: string): Promise<AuthenticationData> {
		const res = await axios.post(`${BASE_URL}${this.path}signin`, {
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}
}

const authToAPI = new AuthToAPI('auth/');

export default authToAPI;
