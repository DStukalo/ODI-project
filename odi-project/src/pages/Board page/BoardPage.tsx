import { useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { useTranslation } from '../../locales/useTranslation';
import styles from './BoardPage.module.scss';

export function BoardPage() {
	const { id } = useParams();
	const newLocal = useTranslation();
	return (
		<div className={styles.wrapper}>
			<div className={styles.titleSection}>
				<NavLink to="/main">
					<Button
						text={newLocal.backBtn}
						classes="welcome__btn"
						image="/images/icon-left.png"
					/>
				</NavLink>
				<h1>Board name</h1>
			</div>
			<div className={styles.columList}>
				<span>Board page id -</span>
				{id}
			</div>
		</div>
	);
}
