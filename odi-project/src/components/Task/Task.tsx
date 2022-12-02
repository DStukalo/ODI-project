import { Button } from '../Button/Button';
import { TaskInfo } from './TaskTypes';
import styles from './Task.module.scss';

export function Task(props: TaskInfo) {
	const { title, id, callback } = props;

	const deleteTask = async () => {
		if (id) {
			callback(id);
		}
	};

	return (
		<div className={styles.taskWrapper}>
			<h3 className={styles.taskTitle}>{title}</h3>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-delBlack.png"
				callback={deleteTask}
			/>
		</div>
	);
}
