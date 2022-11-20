import { Button } from '@/components/Button/Button';
import { AboutBlock } from '@/components/AboutBlock/AboutBlock';
import { NavLink } from 'react-router-dom';
import styles from './WelcomePage.module.scss';

let path = 'main';

function switchPage() {
	if (localStorage.getItem('isLogged') === 'false') {
		path = 'main';// будет использоваться redux для смени состояния
	} else {
		path = 'authorization';// будет использоваться redux для смени состояния
	}
}

export function WelcomePage() {
	return (
		<div className={styles.wrapper}>
			<section className={styles.welcomeSection}>
				<div className={styles.descriptionBlock}>
					<h1 className={styles.mainTittle}>ODI project - best task management for teams</h1>
					<p className={styles.description}>
						This is a visual tool that gives a perfect overview of the current
						work status and simplifies team collaboration and communication.
						Let clients and team members collaborate easily in real-time by
						sharing tasks, information, and comments, anytime and from anywhere
					</p>
					<NavLink to={`/${path}`}>
						<Button
							text="Get started"
							classes="welcome__btn"
							image="/images/icon-start.png"
							callback={switchPage}
						/>
					</NavLink>
				</div>
				<div className={styles.welcomeImg} />
			</section>
			<section className={styles.aboutWrapper}>
				<h2 className={styles.aboutTittle}>Our team</h2>
				<AboutBlock
					tittle="Dmytro Stukalo (Team lead)"
					text="Координация команды и организация митингов. Реализация меню навигации,
					 настройка роутинга, отправки данных на сервер..."
					classes="img-wrapper-dmytro"
					wrapper="about-card-left"
				/>
				<AboutBlock
					tittle="Igor Novitski (Developer)"
					text="Участие в митингах и помощь другим разработчикам.
						Реализация страницы Приветствия приложения..."
					classes="img-wrapper-igor"
					wrapper="about-card-right"
				/>
				<AboutBlock
					tittle="Olga Malkovich (Developer)"
					text="Участие в митингах и помощь другим разработчикам.
						Реализация страницы Авторизации приложения..."
					classes="img-wrapper-olga"
					wrapper="about-card-left"
				/>
			</section>
		</div>
	);
}
