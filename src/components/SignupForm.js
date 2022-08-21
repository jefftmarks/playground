import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const initializedForm = {
	name: "",
	username: "",
	password: "",
}

function SignupForm({ setActiveUser }) {
	const [formData, setFormData] = useState(initializedForm);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (
			formData.password === confirmPassword
			&& formData.password !== ""
			&& formData.password.length >= 5
		) {
			setPasswordsMatch(true);
		} else {
			setPasswordsMatch(false);
		}
	}, [confirmPassword, formData.password])

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData(formData => ({...formData, [name]: value}))
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:4000/users?username=${formData.username}`)
			.then(res => res.json())
			.then(data => {
				if (data.length === 1) {
					alert("Username already exists");
					setFormData(initializedForm);
					setConfirmPassword("");
				} else {
					fetch("http://localhost:4000/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					})
						.then(res => res.json())
						.then(newUser => {
							setActiveUser(newUser);
							history.push("/");
						})
						.catch(e => console.error(e))
				}
			})
			.catch(e => console.error(e));
	}


	return (
		<div style={{border: "1px solid black"}}>

			<h2>Signup Form</h2>

			<form id="signupForm" onSubmit={handleSubmit}>
				<label htmlFor="username">Your Name:
				<input
						type="text"
						id="signupName"
						name="name"
						value={formData.name}
						required
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor="username">Username:
				<input
						type="text"
						id="signupUsername"
						name="username"
						value={formData.username}
						minLength="5"
						maxLength="20"
						required
						onChange={handleChange}
					/>
					(between 5 and 20 characters)
				</label>
					<br />
					<label htmlFor="password">Password:
					<input
						type="password"
						id="signupPassword"
						name="password"
						value={formData.password}
						minLength="5"
						maxLength="20"
						required
						onChange={handleChange}
					/>
					(between 5 and 20 characters)
					</label>
					<br />
					<label htmlFor="confirmPassword" style={passwordsMatch ? { color: "green"} : { color: "red"}}>
						Confirm Password:
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={confirmPassword}
						minLength="5"
						maxLength="20"
						required
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
					{passwordsMatch ? "✓" : "X"}
					</label>
					<br />
					<button type="submit" value="submit" disabled={!passwordsMatch}>Create Account</button>
			</form>
			<Link to="/login">Back to login</Link>
		</div>
	)
}

export default SignupForm;