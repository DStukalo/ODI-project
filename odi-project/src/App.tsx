import { Route, Routes, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome page/WelcomePage';
import { MainPage } from './pages/Main page/MainPage';
import { BoardPage } from './pages/Board page/Board';
import { AuthorizationPage } from './pages/Authorization page/AuthorizationPage';
import { ProfilePage } from './pages/Profile page/ProfilePage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { initialState } from './locales/initialState';
import { Context } from './locales/auth.context';
import { AuthToAPI } from './API/Authorization';

export const TranslationContext = createContext(initialState);

function App() {
	const navigate = useNavigate();
	const [isAuthorize, setIsAuthorize] = useState(AuthToAPI.isAuthorize());

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (isAuthorize) {
			const interval = setInterval(() => {
				if (!AuthToAPI.isAuthorize()) {
					setIsAuthorize(false);
					navigate('/');
					clearInterval(interval);
				}
			}, 1000 * 2 * 60);
			return () => clearInterval(interval);
		}
	}, [isAuthorize, navigate]);

	return (
		<TranslationContext.Provider value={initialState}>
			<Context.Provider value={{ isAuthorize, setIsAuthorize }}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<WelcomePage />} />
						<Route path="main" element={<MainPage />} />
						<Route path="main/board" element={<BoardPage />} />
						<Route path="authorization" element={<AuthorizationPage />}>
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
						</Route>
						<Route path="profile" element={<ProfilePage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</Context.Provider>
		</TranslationContext.Provider>
	);
}

export default App;
