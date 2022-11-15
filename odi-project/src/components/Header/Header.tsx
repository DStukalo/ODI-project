import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

export function Header() {
	const isLogged = localStorage.getItem('isLogged') || 'false';

	return (
		<header>
			<div className={styles.container}>
				<Navigation logged={isLogged} />
			</div>
		</header>
	);
}
