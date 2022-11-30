export interface ListTaskInfo {
	text: string;
	id: string;
	callback: (idColumn: string) => Promise<void>;
}
