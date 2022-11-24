import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

export function Header() {
	// const isLogged = localStorage.getItem('isLogged') || 'false';
	// будет использоваться redux для состояния
	const [sticky, setSticky] = useState('');

	const isSticky = () => {
		const scrollTop = window.scrollY;
		const stickyClass = scrollTop >= 80 ? 'is-sticky' : '';
		setSticky(stickyClass);
	};

	useEffect(() => {
		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	}, []);

	const classes = sticky ? 'is-sticky' : 'header';

	return (
		<header className={styles[`${classes}`]}>
			<div className={styles.container}>
				<Navigation /* logged={isLogged} */ />
			</div>
		</header>
	);
}
