import axios from 'axios';

import { AuthenticationData, UserDataWithStatus } from '@/types/interfaces';
import { BASE_URL } from './consts';

export class AuthToAPI {
	static path: string;

	constructor(path = '/') {
		AuthToAPI.path = path;
	}

	static async signup(
		firstName: string,
		lastName: string,
		username: string,
		password: string,
	): Promise<UserDataWithStatus> {
		const res = await axios.post(`${BASE_URL}${this.path}signup`, {
			firstname: `${firstName}`,
			lastname: `${lastName}`,
			username: `${username}`,
			password: `${password}`,
		});
		return { data: res.data, status: res.status };
	}

	static async signin(login: string, pass: string): Promise<AuthenticationData> {
		const res = await axios.post(`${BASE_URL}${this.path}signin`, {
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}

	static signout() {
		localStorage.removeItem('username');
		document.cookie = 'token=;max-age=-1';
	}

	static getCookie(name: string) {
		const matches = document.cookie.match(
			// eslint-disable-next-line no-useless-escape
			new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '$1')}=([^;]*)`),
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	static getToken() {
		this.getCookie('token');
	}

	static isAuthorize() {
		Boolean(this.getToken());
	}
}
