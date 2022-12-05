import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from '@/locales/useTranslation';
import { authorizeUser } from '@/store/reducers/UserSlice';
import { useAppDispatch } from '@/hooks/redux';
import styles from '@/pages/Authorization page/AuthorizationPage.module.scss';
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

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setLogin(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	async function loginUser(logUser: string, passwordUser: string) {
		try {
			const stateOfLogin = await dispatch(authorizeUser({ login: logUser, pass: passwordUser }));
			if (stateOfLogin.type === 'user/authorizeUser/rejected') {
				setShowErrorModal(true);
			} else {
				setShowSuccessModal(true);
				setTimeout(() => navigate('/main'), 1000);
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
					<h3>{newLocal.modalErrorRegisterText}</h3>
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
					{submit && !login && (
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
