import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@/locales/useTranslation';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
	const [second, setSecond] = useState(5);
	const navigate = useNavigate();
	const newLocal = useTranslation();

	function tic(): void {
		if (second > 0) setSecond(second - 1);
	}

	function updateTime() {
		const timeId = setInterval(tic, 1000);
		function redirectToWelcome() {
			clearInterval(timeId);
			navigate('/');
		}
		setTimeout(redirectToWelcome, 5000);
	}
	updateTime();

	return (
		<div className={styles.wrapper}>
			<section className={styles.welcome}>
				<div className={styles.text}>
					{newLocal.notFoundPage}
				</div>
				<div className={styles.text}>
					{newLocal.notFoundPageRedirect}
					{' '}
					<span className={styles.time}>{second}</span>
				</div>
			</section>
		</div>
	);
}
