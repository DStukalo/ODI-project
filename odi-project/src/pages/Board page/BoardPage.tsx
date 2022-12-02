import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { ListTask } from '@/components/ListTask/ListTask';
import columnsToAPI from '@/API/Columns';
import boardsToAPI from '@/API/Boards';
import { ColumnData } from '@/types/interfaces';
import { useTranslation } from '@/locales/useTranslation';
import { Modal } from '@/components/Modal/Modal';
import styles from './BoardPage.module.scss';

export function BoardPage() {
	const [columnList, setColumns] = useState<ColumnData[]>([]);
	const [modalAddColumn, setShowModalAddColumn] = useState(false);
	const [columnName, setColumnName] = useState('');
	const [boardTitle, setBoardTitle] = useState('');
	const { id } = useParams();
	const newLocal = useTranslation();

	const showModalAddColumn = () => {
		setShowModalAddColumn(true);
	};

	function handleChangeColumnName(e: React.FormEvent<HTMLInputElement>) {
		setColumnName(e.currentTarget.value);
	}

	const getColumns = async (idBoard: string | undefined) => {
		if (idBoard) {
			const { data } = await columnsToAPI.getAllColumnsInBoardID(idBoard);
			setColumns(data);
		}
	};

	const addColumn = async () => {
		if (id) {
			await columnsToAPI.createColumnInBoardID({
				title: columnName,
				boardID: id,
				order: 0,
			});
			setShowModalAddColumn(false);
			setColumnName('');
			getColumns(id);
		}
	};

	const deleteColumn = async (idColumn: string) => {
		if (id) {
			await columnsToAPI.deleteColumnsByIDInBoardID(id, idColumn);
			getColumns(id);
		}
	};

	const getBoard = async (idBoard: string | undefined) => {
		if (idBoard) {
			const { title } = await boardsToAPI.getBoardByID(idBoard);
			setBoardTitle(title);
		}
	};

	useEffect(() => {
		getBoard(id);
		getColumns(id);
	}, [id]);

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
				<h1>{boardTitle}</h1>
			</div>
			<div className={styles.columList}>
				{columnList.map((column) => (
					<ListTask
						key={column._id}
						idBoard={id as string}
						id={column._id}
						text={column.title}
						callback={deleteColumn}
					/>
				))}
				{modalAddColumn && (
					<Modal
						title={newLocal.createColumn}
						onClose={setShowModalAddColumn}
						classes="modal_create"
					>
						<input
							type="text"
							autoComplete="off"
							name="ColumnName"
							value={columnName}
							onChange={handleChangeColumnName}
							id="ColumnName"
							placeholder={newLocal.placeholderColumn}
						/>
						<Button
							classes="modalBoard__btn"
							text={newLocal.create}
							callback={addColumn}
						/>
					</Modal>
				)}
				<Button
					classes="addColumn__btn"
					text={newLocal.addColumn}
					image="/images/icon-addWhite.png"
					callback={showModalAddColumn}
				/>
			</div>
		</div>
	);
}
