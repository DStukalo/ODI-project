import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { UserData } from '@/types/interfaces';
import styles from './ProfilePage.module.scss';

const userDefault = {
	_id: '',
	name: '',
	login: '',
};

export function ProfilePage() {

	const [user, setUser] = useState<UserData>(userDefault);
	const [password, setPassword] = useState('');

	function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
		setUser({ ...user, name: e.currentTarget.value as string });
	}

	function handleChangeLogin(e: React.FormEvent<HTMLInputElement>) {
		setUser({ ...user, login: e.currentTarget.value as string });
	}

	function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value as string);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<div className={styles.profile_container}>
			<h2>Profile</h2>
			<form onSubmit={handleSubmit}>
				<h3>Edit your profile</h3>
				<input
					type="text"
					name="name"
					value={user.name}
					placeholder={user.name}
					className={styles.profile_input}
					onChange={handleChangeName}
				/>
				<input
					type="text"
					name="login"
					value={user.login}
					placeholder={user.login}
					className={styles.profile_input}
					onChange={handleChangeLogin}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder={password}
					className={styles.profile_input}
					onChange={handleChangePassword}
				/>
				<div className={styles.form_buttons}>
					<Button classes="" text="Save" />
					<Button classes="" text="Delete" />
				</div>
			</form>
		</div>
	);
}
