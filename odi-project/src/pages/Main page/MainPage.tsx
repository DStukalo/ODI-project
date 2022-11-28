/* eslint-disable no-underscore-dangle */
import { BoardCard } from '@/components/boardCard/boardCard';
import { useEffect, useState } from 'react';
import { BoardData } from '@/types/interfaces';
import { Button } from '../../components/Button/Button';
import { useTranslation } from '../../locales/useTranslation';
import { BoardsToAPI } from '../../API/Boards';
import styles from './MainPage.module.scss';

const boardsResponse = new BoardsToAPI('boards');

export function MainPage() {
	const [boardsList, setBoards] = useState<BoardData[]>([]);
	const newLocal = useTranslation();
	const getBoards = async () => {
		const { data } = await boardsResponse.getBoards();
		setBoards(data);
	};
	const addBoard = async () => {
		await boardsResponse.createNewBoard(`newBourd ${Math.floor(Math.random() * 10)}`);
		getBoards();
	};
	const deleteBoard = async (id: string) => {
		await boardsResponse.deleteBoardByID(id);
		getBoards();
	};
	useEffect(() => {
		getBoards();
	}, []);
	return (
		<div className={styles.wrapper}>
			<div className={styles.boardsSection}>
				<h1 className={styles.pageTittle}>{newLocal.boardsTitle}</h1>
				<div className={styles.boardsList}>
					{boardsList.map((board) => (
						<BoardCard
							key={board._id}
							text={board.title}
							id={board._id}
							callback={deleteBoard}
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
