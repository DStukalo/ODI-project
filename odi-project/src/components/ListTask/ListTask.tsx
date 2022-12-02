/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Task } from '@/components/Task/Task';
import tasksToAPI from '@/API/Tasks';
import { TaskData } from '@/types/interfaces';
import { ListTaskInfo } from './ListTaskTypes';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function ListTask(props: ListTaskInfo) {
	const [tasksList, setTasks] = useState<TaskData[]>([]);
	const {
		text, id, idBoard, callback,
	} = props;
	const newLocal = useTranslation();

	const deleteColumn = async () => {
		if (id) {
			callback(id);
		}
	};

	const getTasks = async () => {
		const { data } = await tasksToAPI.getTasksInColumnID(idBoard, id);
		setTasks(data);
	};

	const addTask = async () => {
		await tasksToAPI.createTasksInColumnID({
			title: `Task № ${Math.floor(Math.random() * 10)}`,
			order: 0,
			users: [''],
			boardID: idBoard,
			columnsID: id,
			userId: 0,
			description: 'discription',
		});
		getTasks();
	};

	const deleteTask = async (idTask: string) => {
		if (id) {
			await tasksToAPI.deleteTaskByIDInColumnsID(idBoard, id, idTask);
			getTasks();
		}
	};

	useEffect(() => {
		getTasks();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			<Button
				classes="addTask__btn"
				text={newLocal.addTask}
				image="/images/icon-addWhite.png"
				callback={addTask}
			/>
		</div>
	);
}
