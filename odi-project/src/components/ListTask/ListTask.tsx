import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Task } from '@/components/Task/Task';
import tasksToAPI from '@/API/Tasks';
import { TaskData } from '@/types/interfaces';
import { Modal } from '@/components/Modal/Modal';
import { ListTaskInfo } from './ListTaskTypes';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function ListTask(props: ListTaskInfo) {
	const [tasksList, setTasks] = useState<TaskData[]>([]);
	const [modalAddTask, setShowModalAddTask] = useState(false);
	const [taskTitle, setTasksTitle] = useState('');
	const [taskDescription, setTasksDescription] = useState('');
	const {
		text, id, idBoard, callback,
	} = props;
	const newLocal = useTranslation();

	function handleChangeTasksTitle(e: React.FormEvent<HTMLInputElement>) {
		setTasksTitle(e.currentTarget.value);
	}

	function handleChangeTasksDescription(e: React.FormEvent<HTMLTextAreaElement>) {
		setTasksDescription(e.currentTarget.value);
	}

	const showModalAddTask = () => {
		setShowModalAddTask(true);
	};

	const deleteColumn = async () => {
		if (id) {
			callback(id);
		}
	};

	const getTasks = async (boardId: string, idColumn: string) => {
		const { data } = await tasksToAPI.getTasksInColumnID(boardId, idColumn);
		setTasks(data);
	};

	const addTask = async () => {
		await tasksToAPI.createTasksInColumnID({
			title: taskTitle,
			order: 0,
			users: [''],
			boardID: idBoard,
			columnsID: id,
			userId: 0,
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

	return (
		<div className={styles.wrapper}>
			<div className={styles.listHeader}>
				<h3 className={styles.listTitle}>{text}</h3>
				<Button
					classes="deleteBoard__btn"
					image="/images/icon-del.png"
					callback={deleteColumn}
				/>
			</div>
			<div className={styles.listWrapper}>
				{tasksList.map((task) => (
					<Task
						key={task._id}
						id={task._id}
						title={task.title}
						callback={deleteTask}
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
