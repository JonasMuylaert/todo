import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const userContext = useContext(UserContext);
	const { isAuth } = userContext;
	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default ProtectedRoute;
