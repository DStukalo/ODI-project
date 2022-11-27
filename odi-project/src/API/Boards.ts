import axios from 'axios';

import {
	AllUsersData, UserDataWithStatus, AllBoardsData, UserData,
} from '@/types/interfaces';
import { BASE_URL } from './consts';

/* eslint-disable max-len */
export const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjYWU3MDg3MWY1YzA2ZmM3MGI3MSIsImxvZ2luIjoiSWdvciIsImlhdCI6MTY2OTU0NDA4NywiZXhwIjoxNjY5NTg3Mjg3fQ.MD190lpkzWk763kA9Y-45AYpHzBEMKFZMdKAYGHdQSE';
export const ownerID = '6381cae70871f5c06fc70b71';

export class BoardsToAPI {
	public path: string;

	private token: string;

	private ownerID: string;

	constructor(path = '/') {
		this.path = path;
		this.token = tokenUser;
		this.ownerID = ownerID;
	}

	async getBoards(): Promise< AllBoardsData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async createNewBoard(
		title: string,
		users: string[] = [''],
	): Promise< AllUsersData > {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
			data: {
				title: `${title}`,
				owner: `${this.ownerID}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getBoardByID(boardID: string): Promise< AllUsersData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}/${boardID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateBoardByID(
		ID: string,
		title: string,
		users: string[],
	): Promise< UserDataWithStatus > {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}${this.path}${ID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
			data: {
				title: `${title}`,
				owner: `${this.ownerID}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteBoardByID(ID: string): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}${this.path}/${ID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return res.status;
	}

	async getListOfBoards(userID: string[]): Promise< AllUsersData > {
		const usersPath = userID.reduce((acc, el) => `${acc}%${el}`);
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}Set/?ids=${usersPath}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getBoardsByUserID(userID: string): Promise< UserDataWithStatus > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}Set/${userID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

}
