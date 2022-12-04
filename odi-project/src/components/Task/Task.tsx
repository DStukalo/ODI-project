import { useDrag } from 'react-dnd';
import { Button } from '../Button/Button';
import { TaskInfo } from './TaskTypes';
import styles from './Task.module.scss';

export function Task(props: TaskInfo) {
	const {
		title, _id, columnsID, callback, order, description, users,
	} = props;
	const [, dragRef] = useDrag({
		type: 'task',
		item: {
			_id, title, columnsID, order, description, users,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const deleteTask = async () => {
		if (_id) {
			callback(_id);
		}
	};

	return (
		<div className={styles.taskWrapper} ref={dragRef}>
			<h3 className={styles.taskTitle}>{title}</h3>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-delBlack.png"
				callback={deleteTask}
			/>
		</div>
	);
}
