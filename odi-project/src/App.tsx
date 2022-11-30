import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome page/WelcomePage';
import { MainPage } from './pages/Main page/MainPage';
<<<<<<< HEAD
import { BoardPage } from './pages/Bord page/BoardPage';
=======
import { BoardPage } from './pages/Board page/BoardPage';
>>>>>>> bd8bb3bce81759ee9ae8269b438078f15d36cff9
import { AuthorizationPage } from './pages/Authorization page/AuthorizationPage';
import { ProfilePage } from './pages/Profile page/ProfilePage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { setupStore } from './store/store';

const store = setupStore();

function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<WelcomePage />} />
					<Route path="main" element={<MainPage />} />
					<Route path="main/board/:id" element={<BoardPage />} />
					<Route path="authorization" element={<AuthorizationPage />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
					<Route path="profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Provider>
	);
}

export default App;
