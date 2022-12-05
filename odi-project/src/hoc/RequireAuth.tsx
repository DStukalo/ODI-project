import { useAppSelector } from '@/hooks/redux';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: ReactElement }) {
	const { isLogged } = useAppSelector((state) => state.userReducer);

	if (!isLogged) return <Navigate to="/" />;

	return children;
}
