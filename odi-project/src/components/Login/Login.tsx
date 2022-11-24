import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TranslationContext } from '@/App';
import { Context } from '@/locales/auth.context';
import { AuthToAPI } from '@/API/Authorization';
import { Button } from '../Button/Button';
import { TTransl } from '../Header/Navigation/NavigationTypes';
import styles from './Login.module.scss';

export function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [submit, setSubmit] = useState(false);
	const { setIsAuthorize } = useContext(Context);
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setUsername(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const usernameValid = () => !!username;
	const passwordValid = () => !!password;

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (usernameValid() && passwordValid()) {
			await AuthToAPI.signin(username, password);
			setIsAuthorize(true);
			navigate('./main');
		}
		setSubmit(true);
	}

	return (
		<div className={styles.login}>
			<h2>{newLocal.signin}</h2>
			<form onSubmit={handleSubmit} className={styles.form_login}>
				<fieldset className={styles.form_fieldset}>
					{submit && !username && (
						<legend className={styles.error}>{newLocal.errorUsername}</legend>
					)}
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChangeUsername}
						id="username"
						className={styles.form_input}
						placeholder={newLocal.username}
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
						className={styles.form_input}
						placeholder={newLocal.password}
					/>
				</fieldset>
				<Link to="/authorization/register" className={styles.form_link}>
					{newLocal.btnLgn}
				</Link>
				<Button text={newLocal.signup} classes="form_button" />
			</form>
		</div>
	);
}
