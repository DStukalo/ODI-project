import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { UserData } from '@/types/interfaces';
import userToAPI from '@/API/User';
import styles from './ProfilePage.module.scss';

const userDefault = {
	_id: '',
	name: '',
	login: '',
};

export function ProfilePage() {
	const [user, setUser] = useState<UserData>(userDefault);
	const [password, setPassword] = useState('');

	async function getUsers(token: string | null) {
		try {
			const { data } = await userToAPI.getUsers(token);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function getUserById(token: string, ID: string) {
		try {
			const { data } = await userToAPI.getUserByID(token, ID);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
		setUser({ ...user, name: e.currentTarget.value as string });
	};

	const handleChangeLogin = (e: React.FormEvent<HTMLInputElement>) => {
		setUser({ ...user, login: e.currentTarget.value as string });
	};

	const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value as string);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		console.log(user);
		getUsers(token);

	}

	return (
		<div className={styles.profile_container}>
			<h2>Profile</h2>
			<form onSubmit={handleSubmit}>
				<h3>Edit your profile</h3>
				<Input
					type="text"
					name="name"
					value={user.name}
					placeholder={user.name}
					classes="profile_input"
					onChange={handleChangeName}
				/>
				<Input
					type="text"
					name="login"
					value={user.login}
					placeholder={user.login}
					classes="profile_input"
					onChange={handleChangeLogin}
				/>
				<Input
					type="password"
					name="password"
					value={password}
					placeholder={password}
					classes="profile_input"
					onChange={handleChangePassword}
				/>
				<div className={styles.form_buttons}>
					<button
						type="submit"
						onClick={() => {
							handleSubmit;
						}}
					>
						Yes
					</button>
					<Button classes="" text="Save" />
					<Button classes="" text="Delete" />
				</div>
			</form>
		</div>
	);
}
