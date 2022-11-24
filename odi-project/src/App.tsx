import { Route, Routes } from 'react-router-dom';
import { createContext } from 'react';

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
// import { Context } from './locales/auth.context';
// import { AuthToAPI } from './API/Authorization';

export const TranslationContext = createContext(initialState);

function App() {
	// const [isAuthorize, setIsAuthorize] = useState(AuthToAPI.isAuthorize());

	// useEffect(() => {
	// 	if (isAuthorize) {
	// 		const interval = setInterval(() => {
	// 			if (!AuthToAPI.isAuthorize()) {
	// 				setIsAuthorize(false);
	// 				navigate('/');
	// 				clearInterval(interval);
	// 			}
	// 		}, 1000 * 2 * 60);
	// 		return () => clearInterval(interval);
	// 	}
	// }, [isAuthorize, navigate]);

	return (
		<TranslationContext.Provider value={initialState}>
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
		</TranslationContext.Provider>
	);
}

export default App;
