import React from 'react';

const SignUp = () => {
	return (
		<div className="sign-up">
			<form className="form">
				<label forhtml="firstname">First Name</label>
				<input type="text" className="form__input" name="first_name" />
				<label forhtml="lastname">Lastname</label>
				<input type="text" className="form__input" name="last_name" />
				<label forhtml="email">Email</label>
				<input type="email" className="form__input" name="email" />
				<label forhtml="reemail">Retype Email</label>
				<input type="email" className="form__input" name="reemail" />
				<label forhtml="password">Password</label>
				<input type="password" className="form__input" name="password" />
				<label forhtml="repassword">Retype password</label>
				<input type="password" className="form__input" name="re-password" />
				<input type="submit" className="btn" value="Sign up" />
			</form>
		</div>
	);
};

export default SignUp;
