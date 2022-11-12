import { Route, Routes } from 'react-router';

import { NotFoundPage } from './pages/404/NotFoundPage';
import { AuthorizationPage } from './pages/Authorization page/Authorization';
import { BoardPage } from './pages/Board page/Board';
import { WelcomePage } from './pages/Welcome page/WelcomePage';
import { Layout } from './components/Layout/Layout';
import { ProfilePage } from './pages/Profile page/ProfilePage';
import { MainPage } from './pages/Main page/MainPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<WelcomePage />} />
				<Route path="main" element={<MainPage />} />
				<Route path="main/board" element={<BoardPage />} />
				<Route path="authorization" element={<AuthorizationPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
