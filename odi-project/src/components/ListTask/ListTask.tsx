import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './ListTask.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function ListTask() {
	const newLocal = useTranslation();
	return (
		<div className={styles.wrapper}>
			<div className={styles.listHeader}>
				<h3 className={styles.listTitle}>TODO name</h3>
				<Button
					classes="deleteBoard__btn"
					image="/images/icon-del.png"
				/>
			</div>
			<div className={styles.listWrapper}>
				<div className={styles.block}>TASK COMPONENT</div>
				<div className={styles.block}>TASK COMPONENT</div>
				<div className={styles.block}>TASK COMPONENT</div>
			</div>
			<Button
				classes="addTask__btn"
				text={newLocal.addTask}
				image="/images/icon-addWhite.png"
			/>
		</div>
	);
}
