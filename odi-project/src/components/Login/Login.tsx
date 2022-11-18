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
		<div className={styles.form_login}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className={styles.form_group}>
					<label htmlFor="username">
						Username
						<input
							type="text"
							name="username"
							value={username}
							onChange={handleChange}
							id="username"
							placeholder="Username"
						/>
					</label>
				</div>
				<div className={styles.form_group}>
					<label htmlFor="password">
						Password
						<input
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
							id="password"
							placeholder="Password"
						/>
					</label>
				</div>
				<button type="submit">Log in</button>
				<Link to="/register" className="button button-link">
					Don&apos;t have an account? Register here.
				</Link>
			</form>
		</div>
	);
}
