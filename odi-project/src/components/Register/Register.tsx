import { useTranslation } from '@/locales/useTranslation';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthToAPI from '@/API/Authorization';
import { isValidName, isValidPassword } from '@/functions/isValidForm';
import styles from '../../pages/Authorization page/AuthorizationPage.module.scss';
import { Modal } from '../Modal/Modal';

export function Register() {
	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);

	const navigate = useNavigate();
	const newLocal = useTranslation();

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [isFormValid, setFormValid] = useState<boolean>(false);

	useEffect(() => {
		setFormValid(
			isValidName(login)
			&& isValidName(name)
			&& isValidPassword(password),
		);
		setSubmit(true);
	}, [name, login, password]);

	function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
		setName(e.currentTarget.value);
	}

	function handleChangeLogin(e: React.FormEvent<HTMLInputElement>) {
		setLogin(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	async function registerUser(nameUser: string, loginUser: string, passwordUser: string) {
		try {
			await AuthToAPI.signup(nameUser, loginUser, passwordUser);
			setShowSuccessModal(true);
			setTimeout(() => navigate('/authorization/login'), 2000);
		} catch (error) {
			setShowErrorModal(true);
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmit(true);
		if (name && login && password) {
			registerUser(name, login, password);
		}
	}

	return (
		<div className={styles.auth}>
			<h2>{newLocal.signup}</h2>
			{showErrorModal && (
				<Modal
					title={`${newLocal.modalRegisterHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowErrorModal}
					classes="modal_auth"
				>
					<h3>{newLocal.modalErrorRegisterText}</h3>
				</Modal>
			)}
			{showSuccessModal && (
				<Modal
					title={`${newLocal.modalRegisterHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowErrorModal}
					classes="modal_auth"
				>
					<h3>{newLocal.modalSuccessRegisterText}</h3>
				</Modal>
			)}
			<form onSubmit={handleSubmit} className={styles.form_auth}>
				<fieldset className={styles.form_fieldset}>
					{submit && !isValidName(name) && (
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
					{submit && !isValidName(login) && (
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
					{submit && !isValidPassword(password) && (
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
					<button
						type="submit"
						className={styles.form_button}
						disabled={!isFormValid}
					>
						{newLocal.signup}
					</button>
				</div>
			</form>
		</div>
	);
}
