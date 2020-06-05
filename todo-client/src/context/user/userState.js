import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';

import { SET_AUTH } from '../types';

const UserState = props => {
	const initialState = {
		isAuth: false,
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	//STATE FUNC
	const setAuth = val => {
		dispatch({
			type: SET_AUTH,
			payload: val,
		});
	};
	const checkAuth = async () => {
		try {
			const res = await axios({
				method: 'get',
				url: 'http://localhost:5000/auth/is-verif',
				headers: { Authorization: localStorage.Authorization },
			});
			res.data == true ? setAuth(true) : setAuth(false);
		} catch (error) {
			console.log('not logged in');
		}
	};
	useEffect(() => {
		checkAuth();
	}, [state.isAuth]);
	return (
		<UserContext.Provider
			value={{
				isAuth: state.isAuth,
				setAuth,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
