import React, { useState, useContext, useEffect, Fragment } from 'react';

import TodoContext from '../context/todo/todoContext';
import UserContext from '../context/user/userContext';

import Todos from '../components/Todos.js';
import AddToDo from '../components/AddToDo';
import AddList from '../components/AddList';

import ApiHelper from '../util/ApiHelper';

const Home = () => {
	const todoContext = useContext(TodoContext);
	const userContext = useContext(UserContext);
	const { loading, error, fetchData } = todoContext;
	const { isAuth } = userContext;
	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState('');
	const [noListTodo, setNoListTodo] = useState([]);
	const [lists, setLists] = useState([]);

	const setVis = val => {
		setVisible(val);
	};
	const handleSearch = e => {
		setQuery(e.target.value);
	};
	const fetchTodosWithNoList = async () => {
		const res = await ApiHelper.getTodos({ list: 1 });
		setNoListTodo(res.data.todos);
	};
	const fetchListNames = async () => {
		const res = await ApiHelper.getLists();

		setLists(res.data);
	};
	useEffect(() => {
		if (isAuth) {
			fetchTodosWithNoList();
			fetchListNames();
		}
	}, []);

	return (
		<div>
			{visible ? <AddToDo visible={setVis} lists={lists} /> : null}
			{visible ? <AddList visible={setVis} noListTodo={noListTodo} /> : null}
			{error && <div className="error">An error occured...Try again later</div>}
			<div className="form__section form__section--search">
				<input
					value={query}
					className="form__input form__input--text"
					type="text"
					onChange={handleSearch}
					placeholder="Search todos"
				/>
				<label className="form__label form__label--text"></label>
			</div>
			<div className="u-wrapper-center">
				{isAuth && (
					<Fragment>
						<button
							className="btn btn--green"
							onClick={() => {
								setVisible(!visible);
							}}
						>
							<a className="btn__text" href="#add-todo">
								Add Todo
							</a>
						</button>
						<button
							className="btn btn--green"
							onClick={() => {
								setVisible(!visible);
							}}
						>
							<a className="btn__text" href="#add-list">
								Add List
							</a>
						</button>
					</Fragment>
				)}
			</div>

			<Todos />

			{loading && (
				<div className="loading">
					<i className="fas fa-circle-notch loading--spinner"></i>
				</div>
			)}
		</div>
	);
};

export default Home;
