import { Languages } from '@/locales/translationTypes';
import { UserData } from '@/types/interfaces';

export interface LangState {
  language: 'en' | 'ru';
	translations: Languages;
}

export interface UserState {
  user: Omit<UserData, 'name'>;
	isLogged: boolean;
	expirationDate: Date | null;
}

export interface UserParamToSignin {
	login: string;
	pass: string;
}
