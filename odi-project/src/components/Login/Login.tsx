import { AuthToAPI } from '@/API/Authorization';
import { useTranslation } from '@/locales/useTranslation';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../pages/Authorization page/AuthorizationPage.module.scss';
import { Modal } from '../Modal/Modal';
import { Portal } from '../Portal/Portal';

export function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);

	const newLocal = useTranslation();
	const navigate = useNavigate();

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
		setLogin(e.currentTarget.value);
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	async function loginUser(logUser: string, passwordUser: string) {
		const signinApi = new AuthToAPI();
		const loginCreateUser = await signinApi.signin(logUser, passwordUser)
			.catch(() => {
				setShowErrorModal(true);
			});
		if (loginCreateUser) {
			setShowSuccessModal(true);
			localStorage.setItem('token', `${loginCreateUser.data.token}`);
			navigate('/main');

			const user = {
				userLogin: login,
				userPass: password,
				isLogged: true,
			};
			localStorage.setItem('user', JSON.stringify(user));
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
				<Portal>
					<Modal
						header={`${newLocal.modalLoginHeader} ${login}`}
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
						header={`${newLocal.modalLoginHeader} ${login}`}
						text={newLocal.modalSuccessLoginText}
						buttonText={newLocal.modalButton}
						onClose={setShowSuccessModal}
						classes="modal_auth"
					/>
				</Portal>
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
