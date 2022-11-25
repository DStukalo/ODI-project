import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TranslationContext } from '@/App';
// import { AuthToAPI } from '@/API/Authorization';
import { TTransl } from '../Header/Navigation/NavigationTypes';
import styles from '../../pages/Authorization page/AuthorizationPage.module.scss';

export function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setUsername(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

		async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmit(true);
	}

	return (
		<div className={styles.auth}>
			<h2>{newLocal.signin}</h2>
			<form onSubmit={handleSubmit} className={styles.form_auth}>
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
				<button type="submit" className={styles.form_button}>{newLocal.signin}</button>
			</form>
		</div>
	);
}
