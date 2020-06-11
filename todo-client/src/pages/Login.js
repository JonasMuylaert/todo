import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import TodoContext from '../context/todo/todoContext';

import { Error } from '../components/Error';

//UTILS
import Auth from '../util/Auth';
//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';
const Login = () => {
	const userContext = useContext(UserContext);
	const todoContext = useContext(TodoContext);
	const history = useHistory();

	const { setAuth } = userContext;
	const { setLoading, setError, error } = todoContext;

	const [handleChange, handleSubmit, values] = useForm(login);
	async function login() {
		console.log('ello');
		setError(null);
		try {
			setLoading(true);
			const res = await Auth.login(values);
			if (res.status === 200) {
				localStorage.setItem('Authorization', res.data.token);
				setAuth(true);
				history.push('/');
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
			<div className="login">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form__section">
						<input
							type="email"
							className="form__input"
							name="email"
							id="email"
							onChange={handleChange}
							required
						/>
						<label className="form__label form__label--text" forhtml="email">
							<span className="form__span">E-mail</span>
						</label>
					</div>
					<div className="form__section">
						<input
							type="password"
							className="form__input"
							name="password"
							id="password"
							onChange={handleChange}
							required
						/>
						<label className="form__label form__label--text" forhtml="password">
							<span className="form__span">Password</span>
						</label>
					</div>
					<button type="submit" className="btn btn--yellow" value="Login">
						<span className="btn__text">Login</span>
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Login;
