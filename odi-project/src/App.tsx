import { Route, Routes } from 'react-router';

import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome page/WelcomePage';
import { MainPage } from './pages/Main page/MainPage';
import { BoardPage } from './pages/Board page/Board';
import { AuthorizationPage } from './pages/Authorization page/Authorization';
import { ProfilePage } from './pages/Profile page/ProfilePage';
import { NotFoundPage } from './pages/404/NotFoundPage';

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
