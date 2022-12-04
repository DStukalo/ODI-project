import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/redux';
import { Task } from '@/components/Task/Task';
import tasksToAPI from '@/API/Tasks';
import { TaskData } from '@/types/interfaces';
import { useDrop } from 'react-dnd';
import { Modal } from '@/components/Modal/Modal';
import { ListTaskInfo } from './ListTaskTypes';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';
import { TaskInfo } from '../Task/TaskTypes';

export function ListTask(props: ListTaskInfo) {
	const {
		text, id, idBoard, callback, update,
	} = props;
	const [tasksList, setTasks] = useState<TaskData[]>([]);
	const [modalAddTask, setShowModalAddTask] = useState(false);
	const [modalDel, setShowModalDel] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [taskTitle, setTasksTitle] = useState('');
	const [columnTitle, setColumnTitle] = useState(text);
	const [taskDescription, setTasksDescription] = useState('');
	const newLocal = useTranslation();
	const { user } = useAppSelector((state) => state.userReducer);

	const showModalDel = () => {
		setShowModalDel(true);
	};
	const closeModalDel = () => {
		setShowModalDel(false);
	};

	function handleChangeColumnTitle(e: React.FormEvent<HTMLInputElement>) {
		setColumnTitle(e.currentTarget.value);
	}

	function handleChangeTasksTitle(e: React.FormEvent<HTMLInputElement>) {
		setTasksTitle(e.currentTarget.value);
	}

	function handleChangeTasksDescription(e: React.FormEvent<HTMLTextAreaElement>) {
		setTasksDescription(e.currentTarget.value);
	}

	const showModalAddTask = () => {
		setShowModalAddTask(true);
	};
	const showInputSwitch = () => {
		if (showInput) {
			setShowInput(false);
			return;
		}
		setShowInput(true);
	};

	const updateColumnTitle = async () => {
		if (id) {
			update(id, columnTitle);
			setShowInput(false);
		}
	};

	const getTasks = async (boardId: string, idColumn: string) => {
		const { data } = await tasksToAPI.getTasksInColumnID(boardId, idColumn);
		// data.sort((a, b) => a.order - b.order);
		console.log(data);
		setTasks(data);
	};

	const updateTask = async (idTask: string, newTaskTitle: string, newTaskDescription: string) => {
		if (id) {
			await tasksToAPI.updateTaskByIDInColumnsID({
				title: newTaskTitle,
				order: 0,
				users: [''],
				boardID: idBoard,
				columnsID: id,
				userId: user._id,
				description: newTaskDescription,
				taskID: idTask,
			});
			getTasks(idBoard, id);
		}
	};

	const deleteColumn = async () => {
		if (id) {
			callback(id);
			setShowModalDel(false);
		}
	};

	const addTask = async () => {
		await tasksToAPI.createTasksInColumnID({
			title: taskTitle,
			order: tasksList.length,
			users: [''],
			boardID: idBoard,
			columnsID: id,
			userId: user._id,
			description: taskDescription,
		});
		getTasks(idBoard, id);
		setShowModalAddTask(false);
		setTasksTitle('');
		setTasksDescription('');
		getTasks(idBoard, id);
	};

	const deleteTask = async (idTask: string) => {
		if (id) {
			await tasksToAPI.deleteTaskByIDInColumnsID(idBoard, id, idTask);
			getTasks(idBoard, id);
		}
	};

	useEffect(() => {
		getTasks(idBoard, id);
	}, [idBoard, id]);

	async function dropped(item: TaskInfo, BoardID: string, curColumnID: string, userID: string) {
		await tasksToAPI.updateTaskByIDInColumnsID({
			title: item.title,
			order: item.order,
			users: [''],
			boardID: BoardID,
			columnsID: id,
			userId: userID,
			description: item.description,
			taskID: item._id,
		});
		getTasks(idBoard, id);
		getTasks(idBoard, curColumnID);
	}

	const [{ isOver }, dropRef] = useDrop({
		accept: 'task',
		// eslint-disable-next-line @typescript-eslint/no-shadow
		drop: (item: TaskInfo) => dropped(item, idBoard, id, user._id),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<div className={styles.wrapper} ref={dropRef}>
			<div className={styles.listHeader}>
				{(showInput) ? (
					<>
						<input
							type="text"
							autoComplete="off"
							name="columnTitle"
							value={columnTitle}
							onChange={handleChangeColumnTitle}
							id="columnTitle"
							className={styles.listHeaderInput}
						/>
						<Button
							classes="button_input"
							image="/images/icon-ok.png"
							callback={updateColumnTitle}
						/>
						<Button
							classes="button_input"
							image="/images/icon-close.png"
							callback={showInputSwitch}
						/>
					</>
				)
					: (
						<>
							<h3
								className={styles.listTitle}
								onClick={showInputSwitch}
								aria-hidden="true"
							>
								{text}
							</h3>
							<Button
								classes="deleteBoard__btn"
								image="/images/icon-del.png"
								callback={showModalDel}
							/>
						</>
					)}
				{modalDel && (
					<Modal
						title={newLocal.deleteColumnTitle}
						onClose={setShowModalDel}
						classes="modal_delete"
					>
						<div>
							<Button
								classes="modalBoard__btn"
								text={newLocal.yes}
								callback={deleteColumn}
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
			<div className={styles.listWrapper}>
				{tasksList.map((task) => (
					<Task
						key={task._id}
						_id={task._id}
						title={task.title}
						description={task.description}
						callback={deleteTask}
						update={updateTask}
						columnsID={id}
						users={task.users}
						order={task.order}
					/>
				))}
			</div>
			{modalAddTask && (
				<Modal
					title={newLocal.createTask}
					onClose={setShowModalAddTask}
					classes="modal_createTask"
				>
					<input
						type="text"
						autoComplete="off"
						name="taskTitle"
						value={taskTitle}
						onChange={handleChangeTasksTitle}
						id="taskTitle"
						placeholder={newLocal.placeholderTaskTitle}
					/>
					<textarea
						autoComplete="off"
						name="taskDescription"
						value={taskDescription}
						onChange={handleChangeTasksDescription}
						id="taskDescription"
						placeholder={newLocal.placeholderTaskDescription}
					/>
					<Button
						classes="modalBoard__btn"
						text={newLocal.create}
						callback={addTask}
					/>
				</Modal>
			)}
			<Button
				classes="addTask__btn"
				text={newLocal.addTask}
				image="/images/icon-addWhite.png"
				callback={showModalAddTask}
			/>
		</div>
	);
}
