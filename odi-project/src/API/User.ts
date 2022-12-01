import axios, { AxiosInstance } from 'axios';

import { AllUsersData, UserDataWithStatus } from '@/types/interfaces';
import localStorageService from '@/services/localStorageService';
import { ParamsUpdateUserByID } from '@/types/types';
import { BASE_URL } from './consts';

class UserToAPI {
	private instance: AxiosInstance;

	private token: string;

	constructor() {
		this.token = localStorageService.getValue('token', '');
		this.instance = axios.create({
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
	}

	async getUsers(): Promise< AllUsersData > {
		const res = await this.instance.get('users');
		return { data: res.data, status: res.status };
	}

	async getUserByID(ID: string): Promise< UserDataWithStatus > {
		const res = await this.instance.get(`users/${ID}`);
		return { data: res.data, status: res.status };
	}

	async updateUserByID({
		ID,
		name,
		login,
		pass,
	}: ParamsUpdateUserByID): Promise< UserDataWithStatus > {
		const res = await this.instance.put(`users/${ID}`, {
			name: `${name}`,
			login: `${login}`,
			password: `${pass}`,
		});
		return { data: res.data, status: res.status };
	}

	async deleteUserByID(ID: string): Promise< number > {
		const res = await this.instance.delete(`users/${ID}`);
		return res.status;
	}
}

const userToAPI = new UserToAPI();

export default userToAPI;
