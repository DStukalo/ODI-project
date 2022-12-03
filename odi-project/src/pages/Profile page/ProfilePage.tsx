import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import userToAPI from '@/API/User';
import { useAppSelector } from '@/hooks/redux';
import { useTranslation } from '@/locales/useTranslation';
import { Modal } from '@/components/Modal/Modal';
import styles from './ProfilePage.module.scss';

export function ProfilePage() {
	const { user } = useAppSelector((state) => state.userReducer);
	const navigate = useNavigate();
	const newLocal = useTranslation();
	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const deleteUser = async () => {
		try {
			await userToAPI.deleteUserByID(user._id);
			setShowDeleteModal(true);
			setTimeout(() => navigate('/'), 2000);
		} catch (error) {
			setShowErrorModal(true);
		}
	};

	useEffect(() => {
		try {
			const getUserID = async (ID: string) => {
				const { data } = await userToAPI.getUserByID(ID);
				const profileId = data._id;
				if (profileId) {
					setName(data.name);
					setLogin(data.login);
				}
			};
			getUserID(user._id);
		} catch (error) {
			setShowErrorModal(true);
		}

	}, [user._id]);

	const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value as string);
	};

	const handleChangeLogin = (e: React.FormEvent<HTMLInputElement>) => {
		setLogin(e.currentTarget.value as string);
	};

	const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value as string);
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			if (name && login && password) {
				setName(name);
				setLogin(login);
				setPassword(password);
				await userToAPI.updateUserByID({
					ID: user._id, name, login, pass: password,
				});
				setShowSuccessModal(true);
				setTimeout(() => navigate('/'), 2000);
			}
		} catch (error) {
			setShowErrorModal(true);
		}
	}

	return (
		<div className={styles.profile_container}>
			<h2>{newLocal.profileHeader}</h2>
			{showDeleteModal && (
				<Modal
					title={`${newLocal.modalLoginHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowDeleteModal}
					classes="modal_auth"
				>
					<h3>{newLocal.profileModalDelete}</h3>
				</Modal>
			)}
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
					title={`${newLocal.profileModalHeader} ${login}`}
					buttonText={newLocal.modalButton}
					onClose={setShowSuccessModal}
					classes="modal_auth"
				>
					<h3>{newLocal.profileModalEdit}</h3>
				</Modal>
			)}
			<form onSubmit={handleSubmit}>
				<h3>{newLocal.profileHeaderEdit}</h3>
				<fieldset className={styles.profile_fieldset}>
					<legend>{newLocal.profileLegendName}</legend>
					<Input
						type="text"
						name="name"
						value={name}
						autocomplete="name"
						classes="profile_input"
						onChange={handleChangeName}
					/>
				</fieldset>
				<fieldset className={styles.profile_fieldset}>
					<legend>{newLocal.profileLegendLogin}</legend>
					<Input
						type="text"
						name="login"
						value={login}
						classes="profile_input"
						onChange={handleChangeLogin}
					/>
				</fieldset>
				<fieldset className={styles.profile_fieldset}>
					<legend>{newLocal.profileLegendPassword}</legend>
					<Input
						type="password"
						name="password"
						value={password}
						classes="profile_input"
						onChange={handleChangePassword}
					/>
				</fieldset>
				<div className={styles.form_buttons}>
					<button type="submit">{newLocal.profileButtonSave}</button>
					<Button classes="" text={newLocal.profileButtonDelete} callback={deleteUser} />
				</div>
			</form>
		</div>
	);
}
