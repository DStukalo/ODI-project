import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

export function Layout() {
	return (
		<>
			<header>Header</header>
			<main className="main">
				<Outlet />
			</main>
			<Footer />
			{/* <footer>Footer of our app</footer> */}
		</>
	);
}
