import { Button } from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { changeLang } from '@/store/reducers/LanguageSlice';
import { unLogged } from '@/store/reducers/UserSlice';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';
import { TNavProps } from './NavigationTypes';

function logIn() {
	// localStorage.setItem('isLogged', 'false');
	// eslint-disable-next-line max-len
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc2NWQ3MDg3MWY1YzA2ZmM3MGFhNSIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjkzNTg4MTIsImV4cCI6MTY2OTQwMjAxMn0.azhEhTsIVG9aRJgNKA_ptK1XW8yoSswkBuqV-7uAigM';
	localStorage.setItem('token', token);
	// window.location.reload();// будет использоваться redux для смени состояния
}

export function Navigation(props: TNavProps) {

	const dispatch = useAppDispatch();
	const newLocal = useTranslation();
	const { logged } = props;

	const languages = ['en', 'ru'];
	const curLang = localStorage.getItem('lang');

	function changeLanguage(lang: 'ru' | 'en') {
		localStorage.setItem('lang', (lang));
		return changeLang(lang);
	}

	function logOut(prop: boolean) {
		localStorage.removeItem('token');
		return unLogged(prop);
	}

	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			{
				logged
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
								callback={() => dispatch(logOut(false))}
							/>
							{languages.map((lang) => (
								<Button
									key={lang}
									text={lang}
									classes={(curLang === lang ? 'hexagon-btn_active' : 'hexagon-btn')}
									callback={() => dispatch(changeLanguage(lang as 'en' | 'ru'))}
								/>
							))							}
						</ul>
					)
					: 					(
						<ul className={styles.list}>
							<NavItem path="authorization/login" text={newLocal.signin} />
							<NavItem path="authorization/register" text={newLocal.signup} />
							<Button
								text="Sign out"
								classes="navigation__btn"
								image="/images/icon-return.png"
								callback={logIn}
							/>
							{languages.map((lang) => (
								<Button
									key={lang}
									text={lang}
									classes={(curLang === lang ? 'hexagon-btn_active' : 'hexagon-btn')}
									callback={() => dispatch(changeLanguage(lang as 'en' | 'ru'))}
								/>
							))							}
						</ul>

					)
			}
		</nav>
	);
}
