import { Outlet } from 'react-router';

export function Layout() {
	return (
		<>
			<header>Header of our app</header>
			<main className="main">
				<Outlet />
			</main>
			<footer>Footer of our app</footer>
		</>
	);
}
