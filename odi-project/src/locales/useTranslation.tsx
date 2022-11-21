import { useContext } from 'react';
import { TranslationContext } from '@/App';
import { Languages } from './translationTypes';

export const useTranslation = () => {
	const { translations, language } = useContext(TranslationContext);
	return (translations)[language as keyof Languages];
};
