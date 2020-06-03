import React, { useReducer } from 'react';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';

import {
	SET_TODOS,
	SET_LOADING,
	SET_ERROR,
	SET_PAGE,
	CLEAR_TODOS,
	SET_TODO,
} from '../types';

const TodoState = props => {
	//INIT
	const initialState = {
		todos: [],
		todo: {},
		error: false,
		loading: true,
		page: 1,
	};

	const [state, dispatch] = useReducer(TodoReducer, initialState);
	//STATE FUNCTIONS

	const setTodos = data => {
		dispatch({
			type: SET_TODOS,
			payload: data,
		});
	};
	const clearTodos = () => {
		dispatch({
			type: CLEAR_TODOS,
		});
	};
	const setLoading = val => {
		dispatch({
			type: SET_LOADING,
			payload: val,
		});
	};

	const setPage = number => {
		if (number) {
			return dispatch({
				type: SET_PAGE,
				payload: 1,
			});
		}
		dispatch({
			type: SET_PAGE,
		});
	};
	const setError = val => {
		dispatch({
			type: SET_ERROR,
			payload: val,
		});
	};

	const setTodo = e => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		dispatch({
			type: SET_TODO,
			payload: { [name]: value },
		});
	};
	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				todo: state.todo,
				error: state.error,
				loading: state.loading,
				page: state.page,
				setTodos,
				setLoading,
				setError,
				setPage,
				setTodo,
				clearTodos,
			}}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoState;
