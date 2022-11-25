import { UserData } from '@/types/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isValidToken } from '@/functions/isValidToken';
import { AuthToAPI } from '@/API/Authorization';

interface UserState {
  user: Omit<UserData, 'name'>;
	isLogged: boolean;
	expirationDate: Date | null;
	isLoading: boolean;
}

interface UserParamToSignin {
	login: string;
	pass: string;
}

export const authorizeUser = createAsyncThunk(
	'user/authorizeUser',
	async ({ login, pass }: UserParamToSignin, { rejectWithValue }) => {
		const authUser = new AuthToAPI('auth/');
		const signinUser = await authUser.signin(login, pass);
		if ((signinUser).status !== 200) {
			rejectWithValue('Server Error');
		}
		const validToken = isValidToken(signinUser.data.token);
		if (!validToken) {
			return rejectWithValue('Server Error');
		}
		return {
			login: validToken.login,
			id: validToken.id,
			expirationDate: validToken.expirationDate,
		};
	},
);

function getInitialState(): UserState {
	if (localStorage.getItem('token')) {
		const token = localStorage.getItem('token') as string;
		const validToken = isValidToken(token);
		if (validToken.isValid) {
			return {
				user: {
					_id: validToken.id as string,
					login: validToken.login as string,
				},
				isLogged: validToken.isValid,
				expirationDate: validToken.expirationDate as Date,
				isLoading: false,
			};
		}
	}
	return {
		user: {
			_id: 'empty',
			login: 'empty',
		},
		isLogged: false,
		expirationDate: null,
		isLoading: false,
	};
}

const initialState: UserState = getInitialState();

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		unLogged(state, action) {
			state.isLogged = action.payload;
			state.user._id = 'empty';
			state.user.login = 'empty';
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authorizeUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authorizeUser.fulfilled, (state, action) => {
				state.user._id = action.payload.id as string;
				state.user.login = action.payload.login as string;
				state.expirationDate = action.payload.expirationDate as Date;
				state.isLoading = false;
			})
			.addCase(authorizeUser.rejected, (state) => {
				state.isLoading = false;
				
			})
	},
});

export const { unLogged } = userSlice.actions;

export default userSlice.reducer;
