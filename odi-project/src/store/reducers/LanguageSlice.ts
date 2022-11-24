import { translations } from '@/locales/translations';
import { createSlice } from '@reduxjs/toolkit';
import { LangState } from './LanguageSliceTypes';

function getInitialState(): LangState {
	if (localStorage.getItem('lang')) {
		const lang = (localStorage.getItem('lang'));
		return {
			language: lang as 'en' | 'ru',
			translations: { ...translations },
		};
	}
	return {
		language: 'en',
		translations: { ...translations },
	};
}

const initialState: LangState = getInitialState();

export const languageSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeLang(state, action) {
			// eslint-disable-next-line no-param-reassign
			state.language = action.payload;
		},
	},
});

export const { changeLang } = languageSlice.actions;

export default languageSlice.reducer;
