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

export type AuthContext = {
	isAuthorize: boolean;
	setIsAuthorize: (value: boolean) => void;
}

export const AuthContextDefault: AuthContext = {
	isAuthorize: false,
	setIsAuthorize: () => {},
};
