import { Button } from '@/components/Button/Button';
import { useAppDispatch } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { changeLang } from '@/store/reducers/LanguageSlice';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';
import { TNavProps } from './NavigationTypes';

function logOut() {
	// localStorage.setItem('isLogged', 'false');
	// eslint-disable-next-line max-len
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc2NWQ3MDg3MWY1YzA2ZmM3MGFhNSIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjkyOTI1NjEsImV4cCI6MTY2OTMzNTc2MX0.-oVQQrlYo_RVpE2PskNbmFx_6UdvbdlCvwuJjaVVsek';
	localStorage.setItem('token', token);
	// window.location.reload();// будет использоваться redux для смени состояния
}

export function Navigation(props: TNavProps) {

	const dispatch = useAppDispatch();
	const newLocal = useTranslation();
	const { logged } = props;
	console.log(logged);
	const { isLogged } = useAppSelector((state) => state.userReducer);

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
				isLogged
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
							{ language === 'en'
								? (
									<Button
										text={newLocal.btnLang}
										classes="hexagon-btn"
										callback={() => dispatch(changeLang('ru'))}
									/>
								) : (
									<Button
										text={newLocal.btnLang}
										classes="hexagon-btn"
										callback={() => dispatch(changeLang('en'))}
									/>
								)}
						</ul>
					)
					: 					(
						<ul className={styles.list}>
							<NavItem path="authorization/login" text={newLocal.signin} />
							<NavItem path="authorization/register" text={newLocal.signup} />
							{ language === 'en'
								? (
									<Button
										text={newLocal.btnLang}
										classes="hexagon-btn"
										callback={() => dispatch(changeLang('ru'))}
									/>
								) : (
									<Button
										text={newLocal.btnLang}
										classes="hexagon-btn"
										callback={() => dispatch(changeLang('en'))}
									/>
								)}
						</ul>

					)
			}
		</nav>
	);
}
