/* eslint-disable no-underscore-dangle */
import { BoardCard } from '@/components/boardCard/boardCard';
import { useEffect, useState } from 'react';
import { BoardData } from '@/types/interfaces';
import { useTranslation } from '../../locales/useTranslation';
import { BoardsToAPI } from '../../API/Boards';
import styles from './MainPage.module.scss';

/* eslint-disable max-len */
export const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjYWU3MDg3MWY1YzA2ZmM3MGI3MSIsImxvZ2luIjoiSWdvciIsImlhdCI6MTY2OTQ5NTAyMCwiZXhwIjoxNjY5NTM4MjIwfQ.gldMqyj2TUwDKpie73eXg6l1wIADo89FIyMASg6Ay6k';

const boardsResponse = new BoardsToAPI('boards');

export function MainPage() {
	const [boardsList, setBoards] = useState<BoardData[]>([]);
	const getBoards = async () => {
		const { data } = await boardsResponse.getBoards(tokenUser);
		setBoards(data);
		console.log(data);
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
						/>
					))}
				</div>
			</div>
		</div>
	);
}
