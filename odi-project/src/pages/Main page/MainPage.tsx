/* eslint-disable no-underscore-dangle */
import { BoardCard } from '@/components/boardCard/boardCard';
import { useEffect, useState } from 'react';
import { BoardData } from '@/types/interfaces';
import { Button } from '../../components/Button/Button';
import { useTranslation } from '../../locales/useTranslation';
import { BoardsToAPI } from '../../API/Boards';
import styles from './MainPage.module.scss';

/* eslint-disable max-len */
export const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjYWU3MDg3MWY1YzA2ZmM3MGI3MSIsImxvZ2luIjoiSWdvciIsImlhdCI6MTY2OTQ5NTAyMCwiZXhwIjoxNjY5NTM4MjIwfQ.gldMqyj2TUwDKpie73eXg6l1wIADo89FIyMASg6Ay6k';
const ownerID = '6381cae70871f5c06fc70b71';
const boardsResponse = new BoardsToAPI('boards');

export function MainPage() {
	const [boardsList, setBoards] = useState<BoardData[]>([]);
	const getBoards = async () => {
		const { data } = await boardsResponse.getBoards(tokenUser);
		setBoards(data);
	};
	const addBoard = async () => {
		await boardsResponse.createNewBoard(tokenUser, `newBourd ${Math.floor(Math.random()*10)}`, ownerID); // добавить модальное окно
		getBoards();
	};
	useEffect(() => {
		getBoards();
	}, []);
	return (
		<div className={styles.wrapper}>
			<div className={styles.boardsSection}>
				<h1 className={styles.pageTittle}>YOUR BOARDS</h1>
				<div className={styles.boardsList}>
					{boardsList.map((board) => (
						<BoardCard
							key={board._id}
							text={board.title}
							id={board._id}
							callback={getBoards}
						/>
					))}
					<Button
						classes="addBoard__btn"
						image="/images/icon-addBoard.png"
						callback={addBoard}
					/>
				</div>
			</div>
		</div>
	);
}
