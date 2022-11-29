import { useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { ListTask } from '@/components/ListTask/ListTask';
import { useTranslation } from '@/locales/useTranslation';
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
				<ListTask	/>
				<Button
					classes="addColumn__btn"
					text={newLocal.addColumn}
					image="/images/icon-addWhite.png"
				/>
			</div>
		</div>
	);
}
