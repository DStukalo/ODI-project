// import { TaskData } from '@/types/interfaces';
import axios from 'axios';
import { BASE_URL } from './consts';

// class TasksToAPI {
// 	private token: string;

// 	constructor() {
// 		this.token = localStorage.getItem('token') as string;

// 	}

// 	async getTasksInColumnID(
// 		boardID: string,
// 		columnsID: string,
// 	): Promise< { data: TaskData[]; status: number } > {
// 		const res = await axios({
// 			method: 'get',
// 			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/tasks`,
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 		});
// 		return { data: res.data, status: res.status };
// 	}

// 	async createTasksInColumnID(
// 		title: string,
// 		order: number,
// 		users: string[],
// 		boardID: string,
// 		columnsID: string,
// 		userId: number,
// 		description: string,
// 	): Promise< { data: TaskData; status: number } > {
// 		const res = await axios({
// 			method: 'post',
// 			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/tasks`,
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 			data: {
// 				title: `${title}`,
// 				order: `${order}`,
// 				description: `${description}`,
// 				userId: `${userId}`,
// 				users: `${users}`,
// 			},
// 		});
// 		return { data: res.data, status: res.status };
// 	}

// 	async getTaskByIDInColumnsID(
// 		boardID: string,
// 		columnsID: string,
// 		taskID: string,
// 	): Promise< { data: TaskData; status: number } > {
// 		const res = await axios({
// 			method: 'get',
// 			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/tasks/${taskID}`,
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 		});
// 		return { data: res.data, status: res.status };
// 	}

// 	async updateTaskByIDInColumnsID(
// 		title: string,
// 		order: number,
// 		users: string[],
// 		boardID: string,
// 		columnsID: string,
// 		userId: number,
// 		description: string,
// 		taskID: string,
// 	): Promise< { data: TaskData; status: number }> {
// 		const res = await axios({
// 			method: 'put',
// 			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/tasks/${taskID}`,
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 			data: {
// 				title: `${title}`,
// 				order: `${order}`,
// 				description: `${description}`,
// 				userId: `${userId}`,
// 				users: `${users}`,
// 			},
// 		});
// 		return { data: res.data, status: res.status };
// 	}

// 	async deleteTaskByIDInColumnsID(
// 		boardID: string,
// 		columnsID: string,
// 		taskID: string,
// 	): Promise< number > {
// 		const res = await axios({
// 			method: 'delete',
// 			url: `${BASE_URL}boards/${boardID}/columns/${columnsID}/tasks/${taskID}`,
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 		});
// 		return res.status;
// 	}

// 	async getListOfTasksInBoardID(
// 		boardID: string,
// 	): Promise< { data: TaskData[]; status: number } > {
// 		const res = await axios({
// 			method: 'get',
// 			url: `${BASE_URL}tasksSet/${boardID}`,
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${this.token}`,
// 			},
// 		});
// 		return { data: res.data, status: res.status };
// 	}

// 	// Доделать 2 метода tasksSet
// }

// const tasksToAPI = new TasksToAPI();

// export default tasksToAPI;
