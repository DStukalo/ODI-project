import axios, { AxiosInstance } from 'axios';

import localStorageService from '@/services/localStorageService';
import { ColumnData, ColumnListData } from '@/types/interfaces';
import { ParamsCreateColumnInBoardID, ParamsUpdateColumnsByIDInBoardID } from '@/types/types';
import { BASE_URL } from './consts';

class ColumnsToAPI {
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

	async getAllColumnsInBoardID(boardID: string): Promise< ColumnListData > {
		const res = await this.instance.get(`boards/${boardID}/columns`);
		return { data: res.data, status: res.status } as ColumnListData;
	}

	async createColumnInBoardID({
		title,
		order,
		boardID,
	}: ParamsCreateColumnInBoardID): Promise< ColumnData > {
		const res = await this.instance.post(`boards/${boardID}/columns`, {
			title: `${title}`,
			order: `${order}`,
		});
		return { data: res.data, status: res.status };
	}

	async getColumnsByIDInBoardID(boardID: string, columnsID: string): Promise< ColumnData > {
		const res = await this.instance.get(`boards/${boardID}/columns/${columnsID}`);
		return { data: res.data, status: res.status };
	}

	async updateColumnsByIDInBoardID({
		title,
		order,
		boardID,
		columnsID,
	}: ParamsUpdateColumnsByIDInBoardID): Promise< ColumnData > {
		const res = await this.instance.put(`boards/${boardID}/columns/${columnsID}`, {
			title: `${title}`,
			order: `${order}`,
		});
		return { data: res.data, status: res.status };
	}

	async deleteColumnsByIDInBoardID(boardID: string, columnsID: string): Promise< number > {
		const res = await this.instance.delete(`boards/${boardID}/columns/${columnsID}`);
		return res.status;
	}
}

const columnsToAPI = new ColumnsToAPI();

export default columnsToAPI;
