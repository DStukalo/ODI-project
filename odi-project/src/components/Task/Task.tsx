import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Task.module.scss';
import { useTranslation } from '../../locales/useTranslation';

export function Task() {
	const newLocal = useTranslation();
	return (
		<div className={styles.taskWrapper}>
			<h3 className={styles.taskTitle}>Task name</h3>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-delBlack.png"
			/>
		</div>
	);
}
