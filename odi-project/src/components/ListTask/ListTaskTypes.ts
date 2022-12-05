export interface ListTaskInfo {
	text: string;
	id: string;
	idBoard: string ;
	callback: (idColumn: string) => Promise<void>;
	update: (idColumn: string, columnTitle: string) => Promise<void>;
	updateList: () => void;
	drop: boolean;
}
