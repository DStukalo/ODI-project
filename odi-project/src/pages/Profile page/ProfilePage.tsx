import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	const [user, setUser] = useState<UserData>(userDefault);
	const [users, setUsers] = useState<UserData[]>([]);
	const [password, setPassword] = useState('');

	const getUsers = async () => {
		try {
			const { data } = await userToAPI.getUsers();
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getUser = async (ID: string) => {
		try {
			const { data } = await userToAPI.getUserByID(ID);
			// setUser(data);
			console.log(data);
		} catch (error) {
			console.log('Error');
		}
		// try {
		// 	const loginuser = (localStorage.getItem('login') as string);
		// 	const profile = users.find((x) => x.login === loginuser);
		// 	if (profile) {
		// 		setUser(profile);
		// 		console.log(profile);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const deleteUser = async () => {
		try {
			await userToAPI.deleteUserByID(user._id);
			getUsers();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		getUser(user._id);
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
					autocomplete="name"
					// placeholder={user.name}
					classes="profile_input"
					onChange={handleChangeName}
				/>
				<Input
					type="text"
					name="login"
					value={user.login}
					// placeholder={user.login}
					classes="profile_input"
					onChange={handleChangeLogin}
				/>
				<Input
					type="password"
					name="password"
					value={password}
					// placeholder={password}
					classes="profile_input"
					onChange={handleChangePassword}
				/>
				<div className={styles.form_buttons}>
					<button type="submit">Save</button>
					{/* <Button classes="" text="Save" /> */}
					<Button classes="" text="Delete" callback={deleteUser} />
				</div>
			</form>
		</div>
	);
}
