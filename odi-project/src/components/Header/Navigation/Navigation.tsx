import { Button } from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { changeLang } from '@/store/reducers/LanguageSlice';
import localStorageService from '@/services/localStorageService';
import { unLogged } from '@/store/reducers/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/Modal/Modal';
import boardsToAPI from '@/API/Boards';
import { useState } from 'react';
import { NavItem } from './NavItem/NavItem';
import { Logo } from './Logo/Logo';
import styles from './Navigation.module.scss';

export function Navigation() {
	const [modalAdd, setShowModalAdd] = useState(false);
	const [boardName, setBoardName] = useState('');
	const { user } = useAppSelector((state) => state.userReducer);
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

	const showModalAdd = () => {
		setShowModalAdd(true);
	};

	function handleChangeBoardName(e: React.FormEvent<HTMLInputElement>) {
		setBoardName(e.currentTarget.value);
	}

	const addBoard = async () => {
		await boardsToAPI.createNewBoard(boardName, user._id);
		setShowModalAdd(false);
		setBoardName('');
		navigate('/main');
	};

	const navAuthItems = (
		<div className={`${styles.nav_items} ${(menu ? styles.nav_overlay : '')}`}>
			<ul className={`${styles.list} ${(menu ? styles.show : '')}`}>
				<NavItem path="main" text={newLocal.main} callback={closeMenu} />
				<NavItem
					path=""
					text={newLocal.newBoard}
					callModal={showModalAdd}
					callback={closeMenu}
				/>
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
			{modalAdd && (
				<Modal
					title={newLocal.createTitle}
					onClose={setShowModalAdd}
					classes="modal_create"
				>
					<input
						type="text"
						name="boardName"
						value={boardName}
						onChange={handleChangeBoardName}
						id="boardName"
						placeholder={newLocal.createPlaceholder}
					/>
					<Button
						classes="modalBoard__btn"
						text={newLocal.create}
						callback={addBoard}
					/>
				</Modal>
			)}
		</div>
	);

	const navItems = (
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

	);

	return (
		<nav role="navigation" className={styles.navigation}>
			<Logo />
			<div className={styles.nav_container}>
				{ isLogged ? navAuthItems : navItems }
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
