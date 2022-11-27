import { useTranslation } from '@/locales/useTranslation';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthToAPI } from '@/API/Authorization';
import styles from '../../pages/Authorization page/AuthorizationPage.module.scss';
import { Portal } from '../Portal/Portal';
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
		const signupApi = new AuthToAPI();
		const registerQuery = await signupApi.signup(nameUser, loginUser, passwordUser)
			.catch(() => {
				setShowErrorModal(true);
			});
		if (registerQuery) {
			setShowSuccessModal(true);
			navigate('/authorization/login');
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
				<Portal>
					<Modal
						header={`${newLocal.modalRegisterHeader} ${login}`}
						text={newLocal.modalErrorRegisterText}
						buttonText={newLocal.modalButton}
						onClose={setShowErrorModal}
						classes="modal_auth"
					/>
				</Portal>
			)}
			{showSuccessModal && (
				<Portal>
					<Modal
						header={`${newLocal.modalRegisterHeader} ${login}`}
						text={newLocal.modalSuccessRegisterText}
						buttonText={newLocal.modalButton}
						onClose={setShowSuccessModal}
						classes="modal_auth"
					/>
				</Portal>
			)}
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
