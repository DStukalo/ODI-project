import { Button } from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { changeLang } from '@/store/reducers/LanguageSlice';
import localStorageService from '@/services/localStorageService';
import { unLogged } from '@/store/reducers/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';

export function Navigation() {

	const [menu, setMenu] = useState(false);

	const dispatch = useAppDispatch();
	const newLocal = useTranslation();
	const navigate = useNavigate();
	const { isLogged } = useAppSelector((state) => state.userReducer);

	const languages = ['en', 'ru'];
	const curLang = localStorageService.getValue('lang', 'en');

	function changeLanguage(lang: 'ru' | 'en') {
		localStorageService.setValue('lang', (lang));
		return changeLang(lang);
	}

	function logOut(prop: boolean) {
		localStorage.removeItem('token');
		navigate('/');
		return unLogged(prop);
	}

	const handleToggle = () => {
		setMenu(!menu);
	};

	const closeMenu = () => {
		setMenu(false);
	};

	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			<div className={styles.nav_container}>
				{
					isLogged
						? 		(
							<div className={`${styles.nav_items} ${(menu ? styles.nav_overlay : '')}`}>
								<ul className={`${styles.list} ${(menu ? styles.show : '')}`}>
									<NavItem path="main" text={newLocal.main} callback={closeMenu} />
									<NavItem path="main/board" text={newLocal.newBoard} callback={closeMenu} />
									<NavItem
										path="profile"
										text={newLocal.profile}
										callback={closeMenu}
									/>
									<Button
										text={newLocal.signout}
										classes="navigation__btn"
										image="/images/icon-return.png"
										callback={() => dispatch(logOut(false))}
									/>
								</ul>
							</div>
						)
						: 					(
							<div className={`${styles.nav_items} ${(menu ? styles.nav_overlay : '')}`}>
								<ul className={`${styles.list} ${(menu ? styles.show : '')}`}>
									<NavItem path="authorization/login" text={newLocal.signin} callback={closeMenu} />
									<NavItem
										path="authorization/register"
										text={newLocal.signup}
										callback={closeMenu}
									/>
								</ul>
							</div>
						)
				}
				<div className={styles.nav_buttons}>
					{languages.map((lang) => (
						<Button
							key={lang}
							text={lang}
							classes={(curLang === lang ? 'hexagon-btn_active' : 'hexagon-btn')}
							callback={() => dispatch(changeLanguage(lang as 'en' | 'ru'))}
						/>
					))}
					<Button classes="menu" callback={handleToggle} image="/images/menu.png" />
				</div>
			</div>

		</nav>
	);
}
