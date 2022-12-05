import { useAppSelector } from '@/hooks/redux';
import { Languages } from './translationTypes';

export const useTranslation = () => {
	const { language, translations } = useAppSelector((state) => state.langReducer);
	return (translations)[language as keyof Languages];
};
