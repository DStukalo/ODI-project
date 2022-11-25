import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

export function Header() {
	const { isLogged } = useAppSelector((state) => state.userReducer);
	const [sticky, setSticky] = useState('');
	const { expirationDate } = useAppSelector((state) => state.userReducer);

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
				<Navigation logged={isLogged} />
			</div>
		</header>
	);
}
