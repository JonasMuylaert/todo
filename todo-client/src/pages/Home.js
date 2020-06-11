import React, { useState, useContext, useEffect, Fragment } from 'react';

import UserContext from '../context/user/userContext';
import TodoContext from '../context/todo/todoContext';

import Todos from '../components/Todos.js';
import AddToDo from '../components/AddToDo';
import AddList from '../components/AddList';

import { Error } from '../components/Error';

const Home = () => {
	const userContext = useContext(UserContext);
	const todoContext = useContext(TodoContext);
	const { error, loading, fetchData } = todoContext;
	const { isAuth } = userContext;
	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState('');

	const setVis = () => {
		setVisible(!visible);
	};
	const handleSearch = e => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			{visible ? <AddToDo visible={setVis} mode={'add'} /> : null}
			{visible ? <AddList visible={setVis} /> : null}
			{error && <Error error={error} />}
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
			<div className="u-center-text">
				{isAuth && (
					<Fragment>
						<button
							className="btn btn--yellow"
							onClick={() => {
								setVisible(!visible);
							}}
						>
							<a className="btn__text" href="#add-todo">
								Add Todo
							</a>
						</button>
						<button
							className="btn btn--yellow"
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
