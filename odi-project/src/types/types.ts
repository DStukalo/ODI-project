export type ParamsUpdateColumnsByIDInBoardID = {
	title: string;
	order: number;
	boardID: string;
	columnsID: string;
}

export type ParamsCreateColumnInBoardID = {
  title: string;
  order: number;
  boardID: string;
}

export type ParamsUpdateUserByID = {
	ID: string;
	name: string;
	login: string;
	pass: string;
}

export type ParamsUpdateTasksInColumnID = {
	title: string;
	order: number;
	users: string[];
	boardID: string;
	columnsID: string;
	userId: string;
	description: string;
	taskID: string;
}
