import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';
import { TaskInfo } from './TaskTypes';
import styles from './Task.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function Task(props: TaskInfo) {
	const { title, id, callback } = props;
	const [modalDel, setShowModalDel] = useState(false);
	const newLocal = useTranslation();

	const showModalDel = () => {
		setShowModalDel(true);
	};

	const closeModalDel = () => {
		setShowModalDel(false);
	};

	const deleteTask = async () => {
		if (id) {
			callback(id);
			setShowModalDel(false);
		}
	};

	return (
		<div className={styles.taskWrapper}>
			<h3 className={styles.taskTitle}>{title}</h3>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-delBlack.png"
				callback={showModalDel}
			/>
			{modalDel && (
				<Modal
					title={newLocal.deleteTaskTitle}
					onClose={setShowModalDel}
					classes="modal_delete"
				>
					<div>
						<Button
							classes="modalBoard__btn"
							text={newLocal.yes}
							callback={deleteTask}
						/>
						<Button
							classes="modalBoard__btn"
							text={newLocal.no}
							callback={closeModalDel}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
}
