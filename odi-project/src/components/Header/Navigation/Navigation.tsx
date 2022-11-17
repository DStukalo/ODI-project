import { Button } from '@/components/Button/Button';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';

type TNavProps = {
	logged: string;
}

function changeLang() {
	const isEngland = localStorage.getItem('isEngland');
	if (isEngland === 'true') {
		localStorage.setItem('isEngland', 'false');
	} else localStorage.setItem('isEngland', 'true');
	window.location.reload();
}

function logOut() {
	localStorage.setItem('isLogged', 'false');
	window.location.reload();
}

export function Navigation(props: TNavProps) {
	const { logged } = props;
	if (!localStorage.getItem('isEngland')) {
		localStorage.setItem('isEngland', 'true');
	}
	const isEngland = localStorage.getItem('isEngland');
	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			{
				logged === 'true'
					? 		(
						<ul className={styles.list}>
							<NavItem path="main" textEN="Main" textRU="Главная" />
							<NavItem path="main/board" textEN=" New Board" textRU="Новая доска" />
							<NavItem path="profile" textEN="Profile" textRU="Профиль" />
							<Button
								text="Sign out"
								classes="navigation__btn"
								image="/images/icon-return.png"
								callback={logOut}
							/>
							{isEngland === 'true'
								? (
									<Button text="EN" classes="hexagon-btn" callback={changeLang} />
								)
								: (
									<Button text="EN" classes="hexagon-btn" callback={changeLang} />
								)}
						</ul>
					)
					: 					(
						<ul className={styles.list}>
							<NavItem path="forms/signin" textEN="Sign in" textRU="Войти" />
							<NavItem path="forms/signup" textEN="Sign up" textRU="Регистрация" />
							{isEngland === 'true'
								? (
									<Button text="EN" classes="hexagon-btn" callback={changeLang} />
								)
								: (
									<Button text="РУ" classes="hexagon-btn" callback={changeLang} />
								)}
						</ul>
					)
			}
		</nav>
	);
}
