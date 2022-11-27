import { Languages } from '@/locales/translationTypes';

export interface LangState {
  language: 'en' | 'ru';
	translations: Languages;
}
