export interface TaskInfo {
	title: string;
	description: string;
	id: string;
	callback: (idColumn: string) => Promise<void>;
	update: (idTask: string, newTaskTitle: string, newTaskDescription: string) => Promise<void>;
}
