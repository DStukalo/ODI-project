import { ColumnData, ColumnListData } from '@/types/interfaces';
import axios from 'axios';
import { BASE_URL } from './consts';

export class ColumnsToAPI {
	public path: string;

	constructor(path = '/') {
		this.path = path;
	}

	async getColumnsInBoardID(token: string, boardID: string): Promise< ColumnListData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async createColumnInBoardID(
		token: string,
		title: string,
		order: number,
		boardID: string,
	): Promise< ColumnData > {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}boards/${boardID}/${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getColumnsByIDInBoardID(
		token: string,
		boardID: string,
		columnsID: string,
	): Promise< ColumnData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/${this.path}/${columnsID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateColumnsByIDInBoardID(
		token: string,
		title: string,
		order: number,
		boardID: string,
		columnsID: string,
	): Promise< ColumnData > {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}boards/${boardID}/${this.path}/${columnsID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteColumnsByIDInBoardID(
		token: string,
		boardID: string,
		columnsID: string,
	): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}boards/${boardID}/${this.path}/${columnsID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return res.status;
	}

	// Доделать 3 метода columnsSet
}
