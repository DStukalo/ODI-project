import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from '@/locales/useTranslation';
import { authorizeUser } from '@/store/reducers/UserSlice';
import { useAppDispatch } from '@/hooks/redux';
import styles from '@/pages/Authorization page/AuthorizationPage.module.scss';
import { isValidName, isValidPassword } from '@/functions/isValidForm';
import { Modal } from '../Modal/Modal';

export function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);

	const newLocal = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [isFormValid, setFormValid] = useState<boolean>(false);

	useEffect(() => {
		setFormValid(isValidName(login) && isValidPassword(password));
		setSubmit(true);
	}, [login, password]);

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setLogin(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	async function loginUser(logUser: string, passwordUser: string) {
		try {
			const stateOfLogin = await dispatch(
				authorizeUser({ login: logUser, pass: passwordUser }),
			);
			if (stateOfLogin.type === 'user/authorizeUser/rejected') {
				setShowErrorModal(true);
			} else {
				setShowSuccessModal(true);
				const timerId = setInterval(() => {
					if (localStorage.getItem('token')) {
						clearInterval(timerId);
						navigate('/main');
					}
				}, 1000);
			}
		} catch (error) {
			setShowErrorModal(true);
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmit(true);
		if (login && password) {
			loginUser(login, password);
		}
	}

	return (
		<div className={styles.auth}>
			<h2>{newLocal.signin}</h2>
			{showErrorModal && (
				<Modal
					title={`${newLocal.modalLoginHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowErrorModal}
					classes="modal_auth"
				>
					<h3>{newLocal.modalErrorLoginText}</h3>
				</Modal>
			)}
			{showSuccessModal && (
				<Modal
					title={`${newLocal.modalLoginHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowSuccessModal}
					classes="modal_auth"
				>
					<h3>{newLocal.modalSuccessLoginText}</h3>
				</Modal>
			)}
			<form onSubmit={handleSubmit} className={styles.form_auth}>
				<fieldset className={styles.form_fieldset}>
					{submit && !isValidName(login) && (
						<legend className={styles.error}>{newLocal.errorUsername}</legend>
					)}
					<input
						type="text"
						name="username"
						value={login}
						onChange={handleChangeUsername}
						id="username"
						className={styles.form_input}
						placeholder={newLocal.username}
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
						className={styles.form_input}
						placeholder={newLocal.password}
					/>
				</fieldset>
				<Link to="/authorization/register" className={styles.form_link}>
					{newLocal.btnLgn}
				</Link>
				<button
					type="submit"
					className={styles.form_button}
					disabled={!isFormValid}
				>
					{newLocal.signin}
				</button>
			</form>
		</div>
	);
}
