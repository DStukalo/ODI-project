import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { UserData } from '@/types/interfaces';
import React, { useState } from 'react';
import styles from './Profile.module.scss';

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
				<Input
					type="text"
					name="name"
					value={user.name}
					placeholder={user.name}
					classes=""
					callback={() => { handleChangeName; }}
				/>
				<Input
					type="text"
					name="login"
					value={user.login}
					placeholder={user.login}
					classes=""
					callback={() => { handleChangeLogin; }}
				/>
				<Input
					type="password"
					name="password"
					value={password}
					placeholder={password}
					classes=""
					callback={() => handleChangePassword}
				/>
				<div>
					<Button classes="" text="Save" />
					<Button classes="" text="Delete" />
				</div>
			</form>
		</div>
	);
}
