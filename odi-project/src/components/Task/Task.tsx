import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';
import { TaskInfo } from './TaskTypes';
import styles from './Task.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function Task(props: TaskInfo) {
	const {
		title, _id, description, callback, update, columnsID, order, users,
	} = props;

	const [modalDel, setShowModalDel] = useState(false);
	const [modalTask, setShowModalTask] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [taskTitle, setTasksTitle] = useState(title);
	const [taskDescription, setTasksDescription] = useState(description);
	const newLocal = useTranslation();

	const [, dragRef] = useDrag({
		type: 'task',
		item: {
			_id, title, columnsID, order, description, users,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const showModalDel = () => {
		setShowModalDel(true);
	};

	const showModalTask = () => {
		setShowModalTask(true);
	};

	const showEditInput = () => {
		if (showEdit) {
			setShowEdit(false);
			return;
		}
		setShowEdit(true);
	};

	const updateTask = () => {
		update(_id, taskTitle, taskDescription);
		setShowEdit(false);
	};

	function handleChangeTasksTitle(e: React.FormEvent<HTMLInputElement>) {
		setTasksTitle(e.currentTarget.value);
	}

	function handleChangeTaskDescription(e: React.FormEvent<HTMLTextAreaElement>) {
		setTasksDescription(e.currentTarget.value);
	}
	const closeModalDel = () => {
		setShowModalDel(false);
	};

	const deleteTask = async () => {
		if (_id) {
			callback(_id);
			setShowModalDel(false);

		}
	};

	return (
		<div className={styles.taskWrapper} ref={dragRef}>
			<h3 className={styles.taskTitle}>{title}</h3>
			<Button
				classes="button_input"
				image="/images/icon-card.png"
				callback={showModalTask}
			/>
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
			{modalTask && (
				<Modal
					onClose={setShowModalTask}
					classes="modal_description"
				>
					<div>
						<span>{newLocal.task}</span>
						{(!showEdit) ? (
							<span>{title}</span>)
							: (
								<input
									type="text"
									autoComplete="off"
									name="taskTitle"
									value={taskTitle}
									onChange={handleChangeTasksTitle}
									id="taskTitle"
								/>
							)}
					</div>
					<div>
						<span>{newLocal.description}</span>
						{(!showEdit) ? (
							<span>{description}</span>)
							: (
								<textarea
									autoComplete="off"
									name="taskDescription"
									value={taskDescription}
									onChange={handleChangeTaskDescription}
									id="taskDescription"
								/>
							)}
					</div>
					<div>
						{(!showEdit) ? (
							<Button
								classes="welcome__btn"
								text={newLocal.edit}
								callback={showEditInput}
								image="/images/icon-edit.png"
							/>
						)
							: (
								<div>
									<Button
										classes="welcome__btn"
										text={newLocal.save}
										callback={updateTask}
										image="/images/icon-save.png"
									/>
									<Button
										classes="welcome__btn"
										text={newLocal.modalButton}
										callback={showEditInput}
										image="/images/icon-return.png"
									/>
								</div>
							)}

					</div>
				</Modal>
			)}
		</div>
	);
}
