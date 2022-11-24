import { UserData } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isValidToken } from '@/functions/isValidToken';

interface UserState {
  user: Omit<UserData, 'name'>;
	isLogged: boolean;
}

function getInitialState(): UserState {
	if (localStorage.getItem('token')) {
		const validToken = isValidToken();
		if (validToken.isValid) {
			return {
				user: {
					_id: validToken.id as string,
					login: validToken.login as string,
				},
				isLogged: validToken.isValid,
			};
		}
	}
	return {
		user: {
			_id: 'empty',
			login: 'empty',
		},
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
