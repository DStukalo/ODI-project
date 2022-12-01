/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosInstance } from 'axios';

import {	AllUsersData, UserDataWithStatus, AllBoardsData } from '@/types/interfaces';
import localStorageService from '@/services/localStorageService';
import { useAppSelector } from '@/hooks/redux';
import { BASE_URL } from './consts';

export class BoardsToAPI {
	private instance: AxiosInstance;

	private token: string;

	// private ownerID: ;

	constructor() {
		this.token = localStorageService.getValue('token');
		this.instance = axios.create({
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
	}

	async getBoards(): Promise< AllBoardsData > {
		const res = await this.instance.get('boards');
		return { data: res.data, status: res.status };
	}

	async createNewBoard(
		title: string,
		users: string[] = [''],
	): Promise< AllUsersData > {
		const { user } = useAppSelector((state) => state.userReducer);
		const res = await this.instance.post('boards', {
			title: `${title}`,
			owner: `${user._id}`,
			users: `${users}`,
		});
		return { data: res.data, status: res.status };
	}

	async getBoardByID(boardID: string): Promise< AllUsersData > {
		const res = await this.instance.get(`boards/${boardID}`);
		return { data: res.data, status: res.status };
	}

	async updateBoardByID(
		ID: string,
		title: string,
		users: string[],
	): Promise< UserDataWithStatus > {
		const { user } = useAppSelector((state) => state.userReducer);
		const res = await this.instance.put(`boards/${ID}`, {
			title: `${title}`,
			owner: `${user._id}`,
			users: `${users}`,
		});
		return { data: res.data, status: res.status };
	}

	async deleteBoardByID(ID: string): Promise< number > {
		const res = await this.instance.delete(`boards/${ID}`);
		return res.status;
	}

	async getListOfBoards(userID: string[]): Promise< AllUsersData > {
		const usersPath = userID.reduce((acc, el) => `${acc}%${el}`);
		const res = await this.instance.get(`boardsSet/?ids=${usersPath}`);
		return { data: res.data, status: res.status };
	}

	async getBoardsByUserID(userID: string): Promise< UserDataWithStatus > {
		const res = await this.instance.get(`boardsSet/${userID}`);
		return { data: res.data, status: res.status };
	}

}

const boardsToAPI = new BoardsToAPI();

export default boardsToAPI;
