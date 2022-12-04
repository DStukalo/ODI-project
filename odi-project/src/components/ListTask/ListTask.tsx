/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/redux';
import { Task } from '@/components/Task/Task';
import tasksToAPI from '@/API/Tasks';
import { TaskData } from '@/types/interfaces';
import { useDrop } from 'react-dnd';
import { ListTaskInfo } from './ListTaskTypes';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';
import { TaskInfo } from '../Task/TaskTypes';

export function ListTask(props: ListTaskInfo) {
	const [tasksList, setTasks] = useState<TaskData[]>([]);
	const {
		text, id, idBoard, callback,
	} = props;
	const newLocal = useTranslation();
	const { user } = useAppSelector((state) => state.userReducer);

	const deleteColumn = async () => {
		if (id) {
			callback(id);
		}
	};

	const getTasks = async (currentId: string) => {
		const { data } = await tasksToAPI.getTasksInColumnID(idBoard, currentId);
		// data.sort((a, b) => a.order - b.order);
		console.log(data);
		setTasks(data);
	};

	const addTask = async () => {
		await tasksToAPI.createTasksInColumnID({
			title: `Task № ${Math.floor(Math.random() * 10)}`,
			order: tasksList.length,
			users: [''],
			boardID: idBoard,
			columnsID: id,
			userId: user._id,
			description: 'discription',
		});
		getTasks(id);
	};

	const deleteTask = async (idTask: string) => {
		if (id) {
			await tasksToAPI.deleteTaskByIDInColumnsID(idBoard, id, idTask);
			getTasks(id);
		}
	};

	useEffect(() => {
		getTasks(id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

		getTasks(id);
		getTasks(curColumnID);
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
						_id={task._id}
						title={task.title}
						callback={deleteTask}
						columnsID={id}
						users={task.users}
						order={task.order}
						description={task.description}
					/>
				))}
			</div>
			<Button
				classes="addTask__btn"
				text={newLocal.addTask}
				image="/images/icon-addWhite.png"
				callback={addTask}
			/>
		</div>
	);
}
