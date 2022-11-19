import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.scss';

export function Register() {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
	});
	const [submit, setSubmit] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setUser((item) => ({ ...item, [name]: value }));
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		setSubmit(true);
	}

	return (
		<div className={styles.register}>
			<h2>Sign up</h2>
			<form onSubmit={handleSubmit} className={styles.form_register}>
				<fieldset className={styles.form_fieldset}>
					{submit && !user.firstName && (
						<legend className={styles.error}>First name is required</legend>
					)}
					<input
						type="text"
						name="firstName"
						value={user.firstName}
						onChange={handleChange}
						placeholder="First name"
						id="name"
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !user.lastName && (
						<legend className={styles.error}>Last name is required</legend>
					)}
					<input
						type="text"
						name="lastname"
						value={user.lastName}
						onChange={handleChange}
						id="lastname"
						placeholder="Last name"
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !user.username && (
						<legend className={styles.error}>Username is required</legend>
					)}
					<input
						type="text"
						name="username"
						value={user.username}
						onChange={handleChange}
						id="username"
						placeholder="Username"
						className={styles.form_input}
					/>
				</fieldset>
				<fieldset className={styles.form_fieldset}>
					{submit && !user.password && (
						<legend className={styles.error}>Password is required</legend>
					)}
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						id="password"
						placeholder="Password"
						className={styles.form_input}
					/>
				</fieldset>
				<div className="form-button">
					<Link to="/authorization/login" className={styles.form_link}>
						Already have an account? Login here.
					</Link>
					<button type="submit" className={styles.form_button}>Register</button>
				</div>
			</form>
		</div>
	);
}
