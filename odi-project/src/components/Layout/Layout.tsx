import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

import { Header } from '../Header/Header';

export function Layout() {
	return (
		<>
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<Footer />
			{/* <footer>Footer of our app</footer> */}
		</>
	);
}
