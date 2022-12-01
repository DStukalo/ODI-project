/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isValidToken } from '@/functions/isValidToken';
import authToAPI from '@/API/Authorization';
import localStorageService from '@/services/localStorageService';
import { UserParamToSignin, UserState } from './ReducersTypes';

export const authorizeUser = createAsyncThunk(
	'user/authorizeUser',
	async ({ login, pass }: UserParamToSignin, { rejectWithValue }) => {
		try {
			const signinUser = await authToAPI.signin(login, pass);
			const { token } = signinUser.data;
			if ((signinUser).status !== 200) {
				throw new Error('Uncorrect login or password.Server Error');
			}
			const validToken = isValidToken(token);
			if (!validToken) {
				throw new Error('Uncorrect Server Error');
			}
			return {
				token,
				login: validToken.login,
				id: validToken.id,
				expirationDate: validToken.expirationDate,
			};
		} catch (error) {
			rejectWithValue(error);
			return {
				login: '',
				id: '',
				expirationDate: null,
			};
		}
	},
);

function getInitialState(): UserState {
	if (localStorage.getItem('token')) {
		const token = localStorageService.getValue('token') as string;
		const validToken = isValidToken(token);
		if (validToken.isValid) {
			return {
				user: {
					_id: validToken.id as string,
					login: validToken.login as string,
				},
				isLogged: validToken.isValid,
				expirationDate: validToken.expirationDate as Date,
			};
		}
	}
	return {
		user: {
			_id: '',
			login: '',
		},
		isLogged: false,
		expirationDate: null,
	};
}

const initialState: UserState = getInitialState();

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		unLogged(state, action) {
			state.isLogged = action.payload;
			state.user._id = '';
			state.user.login = '';
			state.isLogged = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authorizeUser.fulfilled, (state, action) => {
				state.user._id = action.payload.id as string;
				state.user.login = action.payload.login as string;
				state.expirationDate = action.payload.expirationDate as Date;
				state.isLogged = true;
				localStorageService.setValue('token', `${action.payload.token}`);
			});
	},
});

export const { unLogged } = userSlice.actions;

export default userSlice.reducer;
