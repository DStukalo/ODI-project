import { ColumnData, ColumnListData } from '@/types/interfaces';
import axios from 'axios';
import { BASE_URL } from './consts';

class ColumnsToAPI {
	private token: string;

	constructor() {
		this.token = localStorage.getItem('token') as string;
	}

	async getAllColumnsInBoardID(boardID: string): Promise< ColumnListData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/columns`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status } as ColumnListData;
	}

	async createColumnInBoardID(
		title: string,
		boardID: string,
		order = 0,
	): Promise< ColumnListData > {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}boards/${boardID}/columns`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getColumnsByIDInBoardID(boardID: string, columnsID: string): Promise< ColumnListData > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateColumnsByIDInBoardID(
		title: string,
		order: number,
		boardID: string,
		columnsID: string,
	): Promise< ColumnListData > {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteColumnsByIDInBoardID(boardID: string, columnsID: string): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		});
		return res.status;
	}
}

const columnsToAPI = new ColumnsToAPI();

export default columnsToAPI;
