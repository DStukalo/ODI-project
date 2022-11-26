import { Button } from '../Button/Button';
import styles from './boardCard.module.scss';
import {BoardCardInfo } from './BoardCardTypes';
import { BoardsToAPI } from '../../API/Boards';

const boardResponse = new BoardsToAPI('boards');

/* eslint-disable max-len */
export const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjYWU3MDg3MWY1YzA2ZmM3MGI3MSIsImxvZ2luIjoiSWdvciIsImlhdCI6MTY2OTQ5NTAyMCwiZXhwIjoxNjY5NTM4MjIwfQ.gldMqyj2TUwDKpie73eXg6l1wIADo89FIyMASg6Ay6k';

export function BoardCard(props: BoardCardInfo) {
	const {	text, id, callback } = props;
	const deleteBoard = async () => {
		await boardResponse.deleteBoardByID(tokenUser, id);
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
