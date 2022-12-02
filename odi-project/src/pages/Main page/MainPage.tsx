import { useEffect, useState } from 'react';

import { BoardCard } from '@/components/boardCard/boardCard';
import { BoardData } from '@/types/interfaces';
import { useTranslation } from '@/locales/useTranslation';
import boardsToAPI from '@/API/Boards';
import { Button } from '@/components/Button/Button';
import { Modal } from '@/components/Modal/Modal';
import { useAppSelector } from '@/hooks/redux';
import styles from './MainPage.module.scss';

export function MainPage() {
	const [boardsList, setBoards] = useState<BoardData[]>([]);
	const [modalAdd, setShowModalAdd] = useState(false);
	const [boardName, setBoardName] = useState('');
	const newLocal = useTranslation();
	const { user } = useAppSelector((state) => state.userReducer);

	function handleChangeBoardName(e: React.FormEvent<HTMLInputElement>) {
		setBoardName(e.currentTarget.value);
	}
	const getBoards = async () => {
		const { data } = await boardsToAPI.getBoards();
		setBoards(data);
	};
	const addBoard = async () => {
		await boardsToAPI.createNewBoard(boardName, user._id);
		setShowModalAdd(false);
		setBoardName('');
		getBoards();
	};
	const showModalAdd = () => {
		setShowModalAdd(true);
	};
	const deleteBoard = async (id: string) => {
		await boardsToAPI.deleteBoardByID(id);
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
					{modalAdd && (
						<Modal
							title={newLocal.createTitle}
							onClose={setShowModalAdd}
							classes="modal_create"
						>
							<input
								type="text"
								name="boardName"
								value={boardName}
								onChange={handleChangeBoardName}
								id="boardName"
								placeholder={newLocal.createPlaceholder}
							/>
							<Button
								classes="modalBoard__btn"
								text={newLocal.create}
								callback={addBoard}
							/>
						</Modal>
					)}
					<Button
						classes="addBoard__btn"
						image="/images/icon-addBoard.png"
						callback={showModalAdd}
					/>
				</div>
			</div>
		</div>
	);
}
