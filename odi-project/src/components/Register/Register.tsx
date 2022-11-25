import { useContext, useState } from 'react';
import {
	Link, /* useNavigate */
	useNavigate,
} from 'react-router-dom';
import { TranslationContext } from '@/App';
// import { AuthToAPI } from '@/API/Authorization';
import { AuthToAPI } from '@/API/Authorization';
import styles from '../../pages/Authorization page/AuthorizationPage.module.scss';
import { TTransl } from '../Header/Navigation/NavigationTypes';
// import AuthToAPI from '../../API/Authorization'

export function Register() {
	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const navigate = useNavigate();
	// const [setError] = useState(false);
	// const { setIsAuthorize } = useContext(Context);
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];

	function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
		setName(e.currentTarget.value);
	}

	function handleChangeLogin(e: React.FormEvent<HTMLInputElement>) {
		setLogin(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	async function createUser(nameUser: string, loginUser: string, passwordUser: string) {
		const create = await AuthToAPI.signup(nameUser, loginUser, passwordUser)
			.catch(() => {
				console.log('Ошибка');
			});
		if (create) {
			console.log('Регистрация прошла успешно');
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmit(true);
		if (name && login && password) {
			createUser(name, login, password);
			navigate('/main');
		}
	}

	return (
		<div className={styles.auth}>
			<h2>{newLocal.signup}</h2>
			<form onSubmit={handleSubmit} className={styles.form_auth}>
				<fieldset className={styles.form_fieldset}>
					{submit && !name && (
						<legend className={styles.error}>{newLocal.errorFirstName}</legend>
					)}
					<input
						type="text"
						name="firstName"
						value={name}
						onChange={handleChangeName}
						placeholder={newLocal.firstName}
						id="name"
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !login && (
						<legend className={styles.error}>{newLocal.errorUsername}</legend>
					)}
					<input
						type="text"
						name="username"
						value={login}
						onChange={handleChangeLogin}
						id="username"
						placeholder={newLocal.username}
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !password && (
						<legend className={styles.error}>{newLocal.errorpassword}</legend>
					)}
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChangePassword}
						id="password"
						placeholder={newLocal.password}
						className={styles.form_input}
					/>
				</fieldset>
				<div className="form-button">
					<Link to="/authorization/login" className={styles.form_link}>
						{newLocal.btnRgs}
					</Link>
					<button type="submit" className={styles.form_button}>{newLocal.signup}</button>
				</div>
			</form>
		</div>
	);
}
