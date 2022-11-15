import { NavLink } from 'react-router-dom';

import styles from './Logo.module.scss';
import { ReactComponent as LogoSVG } from '../../../../assets/logo.svg';

export function Logo() {
	return (
		// <LogoSVG className={styles.navigation__img} />
		<NavLink
			className={({ isActive }) => (isActive
				? `${styles.active}`
				: `${styles.navigation__item}`)}
			to="/"
		>
			<LogoSVG className={styles.navigation__img} />
		</NavLink>
	);
}
