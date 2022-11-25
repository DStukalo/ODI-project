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

export interface UserDataWithStatus {
	data: UserData;
	status: number;
}

export interface AllUsersData {
  data: [UserData];
  status: number;
}

export interface ColumnData {
data: {
	'_id': string;
		'title': string;
		'order': number;
		'boardId': string;
};
status: number;
}

export interface ColumnListData {
	data: [{
			'_id': string;
			'title': string;
			'order': number;
			'boardId': string;
	}];
	status: number;
	}
