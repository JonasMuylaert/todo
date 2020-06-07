import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import TodoContext from '../context/todo/todoContext';

import { Error } from '../components/Error';
//util
import Auth from '../util/Auth';
//custom hook
import { useForm } from '../hooks/useForm';
const SignUp = () => {
	const todoContext = useContext(TodoContext);
	const { setLoading, error, setError, fetchData } = todoContext;
	const history = useHistory();

	const { handleChange, handleSubmit, values } = useForm(signUp);
	async function signUp() {
		setError(null);
		try {
			setLoading(true);
			const res = await Auth.signUp(values);
			if (res.status === 200) {
				//show that user was succesfully created
				//sendmail => sever
				history.push('/login');
				fetchData();
			}
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Fragment>
			{error && <Error error={error} />}
			<div className="signup">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form__section">
						<input
							type="text"
							className="form__input"
							name="first_name"
							onChange={handleChange}
							required
						/>
						<label
							forhtml="firstname"
							className="form__label form__label--text"
						>
							<span className="form__span">First name:</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="text"
							className="form__input"
							name="last_name"
							onChange={handleChange}
							required
						/>
						<label forhtml="lastname" className="form__label form__label--text">
							<span className="form__span">Last name</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="email"
							className="form__input"
							name="email"
							onChange={handleChange}
							required
						/>
						<label forhtml="email" className="form__label form__label--text">
							<span className="form__span">Email</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="email"
							className="form__input"
							name="reemail"
							onChange={handleChange}
							required
						/>
						<label forhtml="reemail" className="form__label form__label--text">
							<span className="form__span">Re-enter email</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="password"
							className="form__input"
							name="password"
							onChange={handleChange}
							required
						/>
						<label forhtml="password" className="form__label form__label--text">
							<span className="form__span">Password</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="password"
							className="form__input"
							name="repassword"
							onChange={handleChange}
							required
						/>
						<label
							forhtml="repassword"
							className="form__label form__label--text"
						>
							<span className="form__span">Re-enter Password</span>
						</label>
					</div>
					<button type="submit" className="btn btn--yellow">
						<span className="btn__text">Sign up</span>
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default SignUp;
