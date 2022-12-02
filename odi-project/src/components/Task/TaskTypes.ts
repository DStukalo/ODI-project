export interface TaskInfo {
	title: string;
	id: string;
	callback: (idColumn: string) => Promise<void>;
}
