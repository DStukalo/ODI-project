import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';

type TNavItemProps = {
	path: string;
	textRU: string;
	textEN: string;
}

export function NavItem(props: TNavItemProps) {
	const isEngland = localStorage.getItem('isEngland') || true;
	const { path, textRU, textEN } = props;
	return (
		<li className={styles.list__item}>
			{
				isEngland === 'true'
					? (
						<NavLink
							className={({ isActive }) => (isActive
								? `${styles.active}`
								: `${styles.navigation__item}`)}
							to={`/${path}`}
						>
							{textEN}
						</NavLink>
					)
					: (
						<NavLink
							className={({ isActive }) => (isActive
								? `${styles.active}`
								: `${styles.navigation__item}`)}
							to={`/${path}`}
						>
							{textRU}
						</NavLink>
					)
			}
		</li>

	);
}
