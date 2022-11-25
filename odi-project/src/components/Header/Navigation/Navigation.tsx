import { Button } from '@/components/Button/Button';
import { useAppDispatch } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { changeLang } from '@/store/reducers/LanguageSlice';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';
import { TNavProps } from './NavigationTypes';

function logOut() {
	localStorage.setItem('isLogged', 'false');
	window.location.reload();// будет использоваться redux для смени состояния
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
