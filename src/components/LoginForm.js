import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const initializedForm = {username: "", password: ""};

function LoginForm({ setActiveUser }) {
	const [formData, setFormData] = useState(initializedForm)

	const history = useHistory();

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData(formData => ({...formData, [name]: value}))
	}

	function handleLogin(user) {
		if (user.length === 0) {
			alert("Username does not exist");
			setFormData(initializedForm);
		} else if (formData.password !== user.password) {
			alert("Password incorrect");
			setFormData(initializedForm);
		} else {
			setActiveUser(user);
			setFormData(initializedForm);
			history.push("/");
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:4000/users?username=${formData.username}`)
			.then(res => res.json())
			.then(data => handleLogin(data[0]))
			.catch(e => console.error(e));
	}

	return (
		<div style={{border: "1px solid black"}}>
			<h2>Login Form</h2>

		<form onSubmit={handleSubmit} id="loginForm">
			<label htmlFor="username">Username:</label>
        <input
          type="text"
          id="loginUsername"
          name="username"
					required
					onChange={handleChange}
        />
			<br />
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="loginPassword"
				name="password"
				required
				onChange={handleChange}
			/>
			<br />
			<button type="submit" value="submit">Log In</button>
		</form>
		<p>Don't have an account? <Link to="/signup">Sign up</Link></p>
		</div>
		
	)
}

export default LoginForm;