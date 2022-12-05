export interface TaskInfo {
	title: string;
	_id: string;
	columnsID: string;
	users: string[];
	order: number;
	description: string;
	callback: (idColumn: string) => Promise<void>;
	update: (idTask: string, newTaskTitle: string, newTaskDescription: string) => Promise<void>;
}
