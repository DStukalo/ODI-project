import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome page/WelcomePage';
import { MainPage } from './pages/Main page/MainPage';
import { BoardPage } from './pages/Board page/BoardPage';
import { AuthorizationPage } from './pages/Authorization page/AuthorizationPage';
import { ProfilePage } from './pages/Profile page/ProfilePage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { setupStore } from './store/store';
import { RequireAuth } from './hoc/RequireAuth';
import { RequireNotAuth } from './hoc/RequireNotAuth';

const store = setupStore();

function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<WelcomePage />} />
					<Route
						path="main"
						element={(
							<RequireAuth>
								<MainPage />
							</RequireAuth>
						)}
					/>
					<Route
						path="main/board/:id"
						element={(
							<RequireAuth>
								<BoardPage />
							</RequireAuth>
						)}
					/>
					<Route path="authorization" element={<AuthorizationPage />}>
						<Route
							path="login"
							element={(
								<RequireNotAuth>
									<Login />
								</RequireNotAuth>
							)}
						/>
						<Route
							path="register"
							element={(
								<RequireNotAuth>
									<Register />
								</RequireNotAuth>
							)}
						/>
					</Route>
					<Route
						path="profile"
						element={(
							<RequireAuth>
								<ProfilePage />
							</RequireAuth>
						)}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Provider>
	);
}

export default App;
