import { useContext } from 'react';

import { TranslationContext } from '@/App';
import { Button } from '@/components/Button/Button';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';
// import { translations } from '@/locales/translations';

type TNavProps = {
	logged: string;
}

function changeLang() {
	console.log('change lang');
}

function logOut() {
	localStorage.setItem('isLogged', 'false');
	window.location.reload();
}

type TTransl = {
	en: {
			main: string;
			profile: string;
			newBoard: string;
			btnLang: string;
			signin: string;
			signup: string;
	};
	ru: {
			main: string;
			profile: string;
			newBoard: string;
			btnLang: string;
			signin: string;
			signup: string;
	};
}

export function Navigation(props: TNavProps) {
	const { logged } = props;
	if (!localStorage.getItem('isEngland')) {
		localStorage.setItem('isEngland', 'true');
	}
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];
	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			{
				logged === 'true'
					? 		(
						<ul className={styles.list}>
							<NavItem path="main" text={newLocal.main} />
							<NavItem path="main/board" text={newLocal.newBoard} />
							<NavItem
								path="profile"
								text={newLocal.profile}
							/>
							<Button
								text="Sign out"
								classes="navigation__btn"
								image="/images/icon-return.png"
								callback={logOut}
							/>
							<Button text={newLocal.btnLang} classes="hexagon-btn" callback={changeLang} />
						</ul>
					)
					: 					(
						<ul className={styles.list}>
							<NavItem path="forms/signin" text={newLocal.signin} />
							<NavItem path="forms/signup" text={newLocal.signup} />
							<Button text={newLocal.btnLang} classes="hexagon-btn" callback={changeLang} />
						</ul>
					)
			}
		</nav>
	);
}
