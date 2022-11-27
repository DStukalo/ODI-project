import { Button } from '../Button/Button';
import styles from './boardCard.module.scss';
import {BoardCardInfo } from './BoardCardTypes';
import { BoardsToAPI } from '../../API/Boards';

const boardResponse = new BoardsToAPI('boards');

export function BoardCard(props: BoardCardInfo) {
	const {	text, id, callback } = props;
	const deleteBoard = async () => {
		await boardResponse.deleteBoardByID(id);
		callback();
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
