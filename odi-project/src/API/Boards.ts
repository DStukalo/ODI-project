import axios from 'axios';

import {	AllUsersData, UserDataWithStatus, AllBoardsData } from '@/types/interfaces';
import localStorageService from '@/services/localStorageService';
import { BASE_URL } from './consts';

export const ownerID = '6381cae70871f5c06fc70b71';

export class BoardsToAPI {

	private token: string;

	private ownerID: string;

	constructor() {
		this.token = localStorageService.getValue('token', '');
		this.ownerID = ownerID;
	}

	async getBoards(): Promise< AllBoardsData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards`,
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
			url: `${BASE_URL}boards`,
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
			url: `${BASE_URL}boards/${boardID}`,
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
			url: `${BASE_URL}boards/${ID}`,
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
			url: `${BASE_URL}boards/${ID}`,
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
			url: `${BASE_URL}boardsSet/?ids=${usersPath}`,
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
			url: `${BASE_URL}boardsSet/${userID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

}

const boardsToAPI = new BoardsToAPI();

export default boardsToAPI;
