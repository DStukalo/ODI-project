import { useTranslation } from '@/locales/useTranslation';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './Login.module.scss';

export function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);

	const newLocal = useTranslation();

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setUsername(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
