import { useParams } from 'react-router-dom';
import styles from './BoardPage.module.scss';

export function BoardPage() {
	const { id } = useParams();
	return (
		<div className={styles.wrapper}>
			<span>Board page id -</span>
			{id}
		</div>
	);
}