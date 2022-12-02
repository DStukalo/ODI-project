export interface AuthenticationData {
	data: {
		token: string;
	};
	status: number;
}

export interface UserData {
	_id: string;
	name: string;
	login: string;
}

export interface BoardData {
	title: string;
	_id: string;
	owner: string;
	users: string[];
}

export interface AllBoardsData {
  data: [BoardData];
  status: number;
}

export interface UserDataWithStatus {
	data: UserData;
	status: number;
}

export interface AllUsersData {
  data: [UserData];
  status: number;
}

export interface ColumnData {
	_id: string;
	title: string;
	order: number;
	boardId: string;
}

export interface ColumnListData {
	data: [ColumnData];
	status: number;
	}

export interface TaskData {
	_id: string;
	title: string;
	order: number;
	boardId: string;
	columnId: string;
	description: string;
	userId: string;
	users: string[];
}
