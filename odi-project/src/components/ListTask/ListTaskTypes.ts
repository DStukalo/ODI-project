export interface ListTaskInfo {
	text: string;
	id: string;
	idBoard: string ;
	callback: (idColumn: string) => Promise<void>;
}
