import { Button } from '@/components/Button/Button';
import styles from './WelcomePage.module.scss';

function switchPage() {
	if (localStorage.getItem('isLogged') === 'false') {
		window.location.href = 'main';// будет использоваться redux для смени состояния
	} else {
		window.location.href = 'authorization';// будет использоваться redux для смени состояния
	}

}

export function WelcomePage() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.welcomeSection}>
				<div className={styles.descriptionBlock}>
					<h1 className={styles.mainTittle}>ODI project - best task management for teams</h1>
					<p className={styles.description}>
						This is a visual tool that gives a perfect overview of the current
						work status and simplifies team collaboration and communication.
						Let clients and team members collaborate easily in real-time by
						sharing tasks, information, and comments, anytime and from anywhere
					</p>
					<Button
						text="Get started"
						classes="welcome__btn"
						image="/images/icon-start.png"
						callback={switchPage}
					/>
				</div>
				<div className={styles.welcomeImg} />
			</div>
		</section>
	);
}
