import { Button } from '../Button/Button';
import styles from './boardCard.module.scss';
import { BoardCardInfo } from './BoardCardTypes';

export function BoardCard(props: BoardCardInfo) {
	const {	text, id, callback } = props;
	const deleteBoard = async () => {
		await callback(id);
	};
	return (
		<div className={styles.board}>
			<p className={styles.tittle}>{text}</p>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-del.png"
				callback={deleteBoard}
			/>
		</div>
	);
}
