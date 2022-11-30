import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Task } from '@/components/Task/Task';
import { ListTaskInfo } from './ListTaskTypes';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function ListTask(props: ListTaskInfo) {
	const {	text, id, callback } = props;
	const newLocal = useTranslation();
	const deleteColumn = async () => {
		if (id) {
			callback(id);
		}
	};
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
				<Task />
				<Task />
				<Task />
				<Task />
				<Task />
			</div>
			<Button
				classes="addTask__btn"
				text={newLocal.addTask}
				image="/images/icon-addWhite.png"
			/>
		</div>
	);
}
