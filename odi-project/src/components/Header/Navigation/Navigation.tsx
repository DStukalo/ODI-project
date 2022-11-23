import { Button } from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
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

	const { language } = useAppSelector((state) => state.langReducer);
	const dispatch = useAppDispatch();
	const newLocal = useTranslation();
	const { logged } = props;

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
