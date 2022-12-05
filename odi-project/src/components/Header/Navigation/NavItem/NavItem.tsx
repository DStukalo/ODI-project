import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';
import { TNavItemProps } from './NavItemTypes';

export function NavItem(props: TNavItemProps) {
	const {
		path, text, callback, callModal,
	} = props;

	const handlClick = () => {
		if (callback && callModal) {
			callback();
			callModal();
		} else if (callback) {
			callback();
		}
	};
	return (
		<li className={styles.list__item}>
			<NavLink
				className={({ isActive }) => (isActive
					? `${styles.active}`
					: `${styles.navigation__item}`)}
				to={`/${path}`}
				onClick={handlClick}
			>
				{text}
			</NavLink>
		</li>

	);
}
