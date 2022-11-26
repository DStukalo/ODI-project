import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { UserData } from '@/types/interfaces';
import { useTranslation } from '../../locales/useTranslation';
import { BoardsToAPI } from '../../API/Boards';
import styles from './MainPage.module.scss';

/* eslint-disable max-len */
export const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjYWU3MDg3MWY1YzA2ZmM3MGI3MSIsImxvZ2luIjoiSWdvciIsImlhdCI6MTY2OTQ1MDY4MCwiZXhwIjoxNjY5NDkzODgwfQ.3EpWg5oNWx0osusZguA5ZLi9kNlJhfP6LJfaHraLsdg';

const boardsResponse = new BoardsToAPI('boards');

export function MainPage() {
	const [items, setBoards] = useState<UserData[]>([]);
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
					<div className={styles.board}>
						<p className={styles.tittle}>test</p>
						<Button
							classes="deleteBoard__btn"
							image="/images/icon-del.png"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
