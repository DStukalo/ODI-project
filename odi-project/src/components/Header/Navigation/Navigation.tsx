import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { TranslationContext } from '@/App';
import { Button } from '@/components/Button/Button';
import { Context } from '@/locales/auth.context';
import { AuthToAPI } from '@/API/Authorization';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';
import { /* TNavProps, */ TTransl } from './NavigationTypes';

function changeLang() {
	// eslint-disable-next-line no-console
	console.log('change lang');// будет использоваться redux для смени языка
}

// function logOut() {
// 	localStorage.setItem('isLogged', 'false');
// 	window.location.reload();// будет использоваться redux для смени состояния
// }

export function Navigation(/* props: TNavProps */) {
	// const { logged } = props;
	const { isAuthorize, setIsAuthorize } = useContext(Context);
	const navigate = useNavigate();
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];

	function logOut() {
		AuthToAPI.isAuthorize();
		setIsAuthorize(false);
		navigate('/');
	}

	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			{
				!isAuthorize
				// logged === 'true'
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
								// eslint-disable-next-line react/jsx-no-bind
								callback={logOut}
							/>
							<Button text={newLocal.btnLang} classes="hexagon-btn" callback={changeLang} />
						</ul>
					)
					: 					(
						<ul className={styles.list}>
							<NavItem path="authorization/login" text={newLocal.signin} />
							<NavItem path="authorization/register" text={newLocal.signup} />
							<Button text={newLocal.btnLang} classes="hexagon-btn" callback={changeLang} />
						</ul>
					)
			}
		</nav>
	);
}
