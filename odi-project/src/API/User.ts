import axios from 'axios';

import { AllUsersData, UserDataWithStatus } from '@/types/interfaces';
import { BASE_URL } from './consts';

export class UserToAPI {
	public path: string;

	constructor(path = '/') {
		this.path = path;
	}

	async getUsers(token: string): Promise< AllUsersData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getUserByID(token: string, ID: string): Promise< UserDataWithStatus > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}${ID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateUserByID(
		token: string,
		ID: string,
		name: string,
		login: string,
		pass: string,
	): Promise< UserDataWithStatus > {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}${this.path}${ID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				name: `${name}`,
				login: `${login}`,
				password: `${pass}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteUserByID(token: string, ID: string): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}${this.path}${ID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return res.status;
	}
}
