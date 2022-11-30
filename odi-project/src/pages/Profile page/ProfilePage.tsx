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

	async function getUsers() {
		try {
			const { data } = await userToAPI.getUsers();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	function getUser() {
		const profile = localStorage.getItem('user');
		console.log(profile);
	}

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		getUser();
	});

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
					<Button classes="" text="Save" />
					<Button classes="" text="Delete" />
				</div>
			</form>
		</div>
	);
}
