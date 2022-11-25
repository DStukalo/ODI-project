import { TaskData } from '@/types/interfaces';
import axios from 'axios';
import { BASE_URL } from './consts';

export class TasksToAPI {
	public path: string;

	constructor(path = '/') {
		this.path = path;
	}

	async getTasksInColumnID(
		token: string,
		boardID: string,
		columnsID: string,
	): Promise< { data: TaskData[]; status: number } > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async createTasksInColumnID(
		token: string,
		title: string,
		order: number,
		users: string[],
		boardID: string,
		columnsID: string,
		userId: number,
		description: string,
	): Promise< { data: TaskData; status: number } | { 'statusCode': string;'message': string } > {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/${this.path}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
				description: `${description}`,
				userId: `${userId}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async getTaskByIDInColumnsID(
		token: string,
		boardID: string,
		columnsID: string,
		taskID: string,
	): Promise< { data: TaskData; status: number } > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/${this.path}/${taskID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async updateTaskByIDInColumnsID(
		token: string,
		title: string,
		order: number,
		users: string[],
		boardID: string,
		columnsID: string,
		userId: number,
		description: string,
		taskID: string,
	): Promise< { data: TaskData; status: number }> {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/${this.path}/${taskID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: `${title}`,
				order: `${order}`,
				description: `${description}`,
				userId: `${userId}`,
				users: `${users}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	async deleteTaskByIDInColumnsID(
		token: string,
		boardID: string,
		columnsID: string,
		taskID: string,
	): Promise< number > {
		const res = await axios({
			method: 'delete',
			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/${this.path}/${taskID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return res.status;
	}

	async getListOfTasksInBoardID(
		token: string,
		boardID: string,
	): Promise< { data: TaskData[]; status: number } > {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}${this.path}Set/${boardID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data: res.data, status: res.status };
	}

	// Доделать 2 метода tasksSet
}
