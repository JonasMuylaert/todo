import React, { useReducer, useEffect } from 'react';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';

import { SET_TODOS, SET_LOADING, SET_ERROR } from '../types';

import ApiHelper from '../../util/ApiHelper';
const TodoState = props => {
	//INIT
	const initialState = {
		todos: [],
		error: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(TodoReducer, initialState);
	//STATE FUNCTIONS

	const setTodos = data => {
		dispatch({
			type: SET_TODOS,
			payload: data,
		});
	};
	const setLoading = loading => {
		dispatch({
			type: SET_LOADING,
			payload: loading,
		});
	};
	const setError = error => {
		dispatch({
			type: SET_ERROR,
			payload: error,
		});
	};

	const fetchData = async () => {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper.getTodos();
			setTodos(res.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				error: state.error,
				loading: state.loading,
				fetchData,
				setTodos,
				setLoading,
				setError,
			}}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoState;
