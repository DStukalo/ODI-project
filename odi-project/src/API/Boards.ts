import axios from 'axios';

import { AllUsersData, UserDataWithStatus } from '@/types/interfaces';
import { BASE_URL } from './consts';

export class BoardsToAPI {
	public path: string;

	constructor(path = '/') {
		this.path = path;
	}

	async getBoards(token: string): Promise< AllUsersData > {
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

	async createNewBoard(
		token: string,
		title: string,
		owner: string,
		users: string[],
	): Promise< AllUsersData > {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: `${title}`,
				owner: `${owner}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getBoardByID(token: string, boardID: string): Promise< AllUsersData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}/${boardID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateBoardByID(
		token: string,
		ID: string,
		title: string,
		owner: string,
		users: string[],
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
				title: `${title}`,
				owner: `${owner}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteBoardByID(token: string, ID: string): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}/${this.path}/${ID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return res.status;
	}

	async getListOfBoards(token: string, userID: string[]): Promise< AllUsersData > {
		const usersPath = userID.reduce((acc, el) => `${acc}%${el}`);
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}Set/?ids=${usersPath}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getBoardsByUserID(token: string, userID: string): Promise< UserDataWithStatus > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}Set/${userID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

}
