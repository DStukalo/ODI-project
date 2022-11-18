import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

export function Login() {
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
	});
	const { username, password } = inputs;

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setInputs((input) => ({ ...input, [name]: value }));
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
	}

	return (
		<div className={styles.login}>
			<h2>Sign in</h2>
			<form onSubmit={handleSubmit} className={styles.form_login}>
				<fieldset className={styles.form_fieldset}>
					{/* <legend>Username</legend> */}
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
						id="username"
						className={styles.form_input}
						placeholder="Username"
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{/* <legend>Password</legend> */}
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						id="password"
						className={styles.form_input}
						placeholder="Password"
					/>
				</fieldset>
				<Link to="/authorization/register" className={styles.form_link}>
					Don&apos;t have an account? Register here.
				</Link>
				<button type="submit" className={styles.form_button}>Log in</button>
			</form>
		</div>
	);
}
