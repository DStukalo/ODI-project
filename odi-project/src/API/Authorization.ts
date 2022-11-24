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

	static async signin(username: string, pass: string): Promise<AuthenticationData> {
		const res = await axios.post(`${BASE_URL}${this.path}signin`, {
			username: `${username}`,
			password: `${pass}`,
		});
		if (res.data) {
			localStorage.setItem('username', username);
			localStorage.setItem('res.data', res.data);
			document.cookie = `res.data=${res.data}; max-age=60*60*24`;
		}
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
