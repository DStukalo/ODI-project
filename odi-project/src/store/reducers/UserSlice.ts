import { decodeToken } from 'react-jwt';

import { UserData } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: UserData;
  isLoading: boolean;
	isLogged: boolean;
}

interface IToken {
  id: string;
  login: string;
  iat: string;
  exp: string;
}

function getInitialState(): UserState {
	if (localStorage.getItem('token')) {
		const token = localStorage.getItem('token') as string;
		const decodetToken = decodeToken<IToken>(token);
		// Date(decodedToken.exp * 1000) и будет время истечения
		return {
			user: {
				_id: 'empty',
				name: 'Guest',
				login: 'empty',
			},
			isLoading: true,
			isLogged: false,
		};
	}
	return {
		user: {
			_id: 'empty',
			name: 'Guest',
			login: 'empty',
		},
		isLoading: true,
		isLogged: false,
	};
}

const initialState: UserState = getInitialState();

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeLogged(state, action: PayloadAction<boolean>) {
			// eslint-disable-next-line no-param-reassign
			state.isLogged = action.payload;
		},
	},
});

export const { changeLogged } = userSlice.actions;

export default userSlice.reducer;
