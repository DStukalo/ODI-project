import axios, { AxiosInstance } from 'axios';

import { TaskData } from '@/types/interfaces';
import { ParamsUpdateTasksInColumnID } from '@/types/types';
import localStorageService from '@/services/localStorageService';
import { BASE_URL } from './consts';

class TasksToAPI {
	private instance: AxiosInstance;

	private token: string;

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

	async getTasksInColumnID(
		boardID: string,
		columnsID: string,
	): Promise< { data: TaskData[]; status: number } > {
		const res = await this.instance.get(`boards/${boardID}/columns/${columnsID}/tasks`);
		return { data: res.data, status: res.status };
	}

	async createTasksInColumnID({
		title,
		order,
		users,
		boardID,
		columnsID,
		userId,
		description,
	}: Omit<ParamsUpdateTasksInColumnID, 'taskID'>): Promise< { data: TaskData; status: number } > {
		const res = await this.instance.post(`boards/${boardID}/columns/${columnsID}/tasks`, {
			title: `${title}`,
			order: `${order}`,
			description: `${description}`,
			userId: `${userId}`,
			users: `${users}`,
		});
		return { data: res.data, status: res.status };
	}

	async getTaskByIDInColumnsID(
		boardID: string,
		columnsID: string,
		taskID: string,
	): Promise< { data: TaskData; status: number } > {
		const res = await this.instance.get(`boards/${boardID}/columns/${columnsID}/tasks/${taskID}`);
		return { data: res.data, status: res.status };
	}

	async updateTaskByIDInColumnsID({
		title,
		order,
		users,
		boardID,
		columnsID,
		userId,
		description,
		taskID,
	}: ParamsUpdateTasksInColumnID): Promise< { data: TaskData; status: number }> {
		const res = await this.instance.put(`boards/${boardID}/columns/${columnsID}/tasks/${taskID}`, {
			title: `${title}`,
			order: `${order}`,
			description: `${description}`,
			columnId: `${columnsID}`,
			userId: `${userId}`,
			users: `${users}`,
			columnId: `${columnsID}`,
		});
		return { data: res.data, status: res.status };
	}

	async deleteTaskByIDInColumnsID(
		boardID: string,
		columnsID: string,
		taskID: string,
	): Promise< number > {
		const res = await this.instance.delete(
			`boards/${boardID}/columns/${columnsID}/tasks/${taskID}`,
		);
		return res.status;
	}

	async getListOfTasksInBoardID(
		boardID: string,
	): Promise< { data: TaskData[]; status: number } > {
		const res = await this.instance.get(`tasksSet/${boardID}`);
		return { data: res.data, status: res.status };
	}

}

const tasksToAPI = new TasksToAPI();

export default tasksToAPI;
