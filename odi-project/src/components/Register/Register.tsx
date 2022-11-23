import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TranslationContext } from '@/App';
import { Button } from '../Button/Button';
import { TTransl } from '../Header/Navigation/NavigationTypes';
import styles from './Register.module.scss';

export function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TTransl)[language as keyof TTransl];

	function handleChangeFirstName(e: React.FormEvent<HTMLInputElement>) {
		setFirstName(e.currentTarget.value);
	}

	function handleChangeLastName(e: React.FormEvent<HTMLInputElement>) {
		setLastName(e.currentTarget.value);
	}

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setUsername(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		setSubmit(true);
	}

	return (
		<div className={styles.register}>
			<h2>{newLocal.signup}</h2>
			<form onSubmit={handleSubmit} className={styles.form_register}>
				<fieldset className={styles.form_fieldset}>
					{submit && !firstName && (
						<legend className={styles.error}>{newLocal.errorFirstName}</legend>
					)}
					<input
						type="text"
						name="firstName"
						value={firstName}
						onChange={handleChangeFirstName}
						placeholder={newLocal.firstName}
						id="name"
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !lastName && (
						<legend className={styles.error}>{newLocal.errorLastName}</legend>
					)}
					<input
						type="text"
						name="lastname"
						value={lastName}
						onChange={handleChangeLastName}
						id="lastname"
						placeholder={newLocal.lastName}
						className={styles.form_input}
					/>
				</fieldset>
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
					<Button text={newLocal.signup} classes="form_button" />
				</div>
			</form>
		</div>
	);
}
