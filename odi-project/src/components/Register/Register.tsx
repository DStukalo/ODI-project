import { useState } from 'react';

export function Register() {
	const [name, setName] = useState('');
	const [pass, setPass] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	return (
		<div className="auth-form" onSubmit={handleSubmit}>
			<h2>Register</h2>
			<form className="register-form">
				{/* <label htmlFor="name">Full name</label> */}
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					name="name"
					id="name"
					placeholder="Full name"
				/>
				{/* <label htmlFor="pass">Password</label> */}
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					id="pass"
					placeholder="Password"
					name="paassword"
				/>
				{/* <label htmlFor="email">Email</label> */}
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="email"
					placeholder="E-mail"
					name="email"
				/>
				<button type="submit">Log In</button>
			</form>
			<button className="link-button" type="submit">Already have an account? Login here.</button>
		</div>
	);
}
