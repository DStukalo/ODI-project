/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { ListTask } from '@/components/ListTask/ListTask';
import columnsToAPI from '@/API/Columns';
import { ColumnData } from '@/types/interfaces';
import { useTranslation } from '@/locales/useTranslation';
import styles from './BoardPage.module.scss';

export function BoardPage() {
	const [columnList, setColumns] = useState<ColumnData[]>([]);
	const { id } = useParams();
	const newLocal = useTranslation();

	const getColumns = async () => {
		if (id) {
			const { data } = await columnsToAPI.getAllColumnsInBoardID(id);
			setColumns(data);
			// console.log(data);
		}
	};

	const addColumn = async () => {
		if (id) {
			await columnsToAPI.createColumnInBoardID({
				title: `random Column ${Math.floor(Math.random() * 10)}`,
				boardID: id,
				order: 0,
			});
			getColumns();
		}
	};

	const deleteColumn = async (idColumn: string) => {
		if (id) {
			await columnsToAPI.deleteColumnsByIDInBoardID(id, idColumn);
			getColumns();
		}
	};

	useEffect(() => {
		getColumns();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<h1>Board name</h1>
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
				<Button
					classes="addColumn__btn"
					text={newLocal.addColumn}
					image="/images/icon-addWhite.png"
					callback={addColumn}
				/>
			</div>
		</div>
	);
}
