import React from 'react';

const Login = () => {
	return (
		<div className="login">
			<form className="form">
				<label className="form__label" forhtml="email">
					Email:
				</label>
				<input type="email" className="form__input" name="email" id="email" />
				<label className="form__label" forhtml="password">
					Password:
				</label>
				<input
					type="password"
					className="form__input"
					name="password"
					id="password"
				/>
				<input type="submit" className="btn" value="Login" />
			</form>
		</div>
	);
};

export default Login;
