import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const { username, password } = inputs;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  return (
    <div className="form-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
						id="username"
						placeholder="Username"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						id="password"
						placeholder="Password"
					/>
				</div>
        <div className="form-button">
					<button type="submit">Log in</button>
					<Link to="/register" className="button button-link">
						Don't have an account? Register here.
					</Link>
				</div>
      </form>
    </div>
  )
}