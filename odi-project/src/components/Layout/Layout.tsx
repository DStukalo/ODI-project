import { Outlet } from 'react-router-dom';

export function Layout() {
	return (
		<>
			<header>Header</header>
			<main className="main">
				<Outlet />
			</main>
			<footer>Footer of our app</footer>
		</>
	);
}
