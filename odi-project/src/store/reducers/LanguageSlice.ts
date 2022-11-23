import { translations } from '@/locales/translations';
import { Languages } from '@/locales/translationTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LangState {
  language: 'en' | 'ru';
	translations: Languages;
}

const initialState: LangState = {
	language: 'en',
	translations: { ...translations },
};

export const languageSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeLang(state, action: PayloadAction<'ru' | 'en'>) {
			// eslint-disable-next-line no-param-reassign
			state.language = action.payload;
		},
	},
});

export const { changeLang } = languageSlice.actions;

export default languageSlice.reducer;
