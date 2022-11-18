import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register() {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setUser((item) => ({ ...item, [name]: value }));
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
	}

	return (
		<div className="form-auth">
			<h2>Register</h2>
			<form className="register-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">
						First name
						<input
							type="text"
							name="firstName"
							value={user.firstName}
							onChange={handleChange}
							placeholder="First name"
							id="name"
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="lastname">
						Last name
						<input
							type="text"
							name="lastname"
							value={user.lastName}
							onChange={handleChange}
							id="lastname"
							placeholder="Last name"
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="username">
						Username
						<input
							type="text"
							name="username"
							value={user.username}
							onChange={handleChange}
							id="username"
							placeholder="Username"
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="password">
						Password
						<input
							type="password"
							name="password"
							value={user.password}
							onChange={handleChange}
							id="password"
							placeholder="Password"
						/>
					</label>
				</div>
				<div className="form-button">
					<button type="submit">Register</button>
					<Link to="/login" className="button button-link">
						Already have an account? Login here.
					</Link>
				</div>
			</form>
		</div>
	);
}
