import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

export function Layout() {
	return (
		<>
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<footer>Footer of our app</footer>
		</>
	);
}
