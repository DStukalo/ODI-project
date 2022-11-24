import { Outlet } from 'react-router-dom';

// import { FC, ReactElement } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthToAPI } from '@/API/Authorization';

export function AuthorizationPage() {
	return (
		<div>
			<Outlet />
		</div>
	);
}

// interface IProps {
// 	children: ReactElement;
// }

// const publicPaths = ['/authorization/login', 'authorization/register', '/main', '/main/board'];
// export const AuthorizationPage: FC<IProps> = ({ children }) => {
// 	const location = useLocation();
// 	if (!publicPaths.includes(location.pathname) && !AuthToAPI.isAuthorize()) {
// 		<Navigate to="/authorization/login" />;
// 	}
// 	if (location.pathname.includes('/authorization') && !AuthToAPI.isAuthorize()) {
// 		<Navigate to="/" />;
// 	}
// 	return children;
// };
