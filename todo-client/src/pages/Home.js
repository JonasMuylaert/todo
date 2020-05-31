import React, { useState, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import Todos from '../components/Todos.js';
import AddToDo from '../layout/AddToDo';

import { useTodos } from '../hooks/useTodos';

const Home = () => {
	const todoContext = useContext(TodoContext);

	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState('');
	const [lastElement, setLastElement] = useState(null);

	const { loading, error, setPage, page } = todoContext;
	const setVis = val => {
		setVisible(val);
	};
	const handleSearch = e => {
		setQuery(e.target.value);
		setPage(1);
	};

	const lastEl = val => {
		setLastElement(val);
		console.log(lastElement);
	};

	const { hasMore } = useTodos(page, query);

	return (
		<div>
			{visible ? <AddToDo visible={setVis} /> : null}
			{error && <div className="error">An error occured...Try again later</div>}
			<input
				value={query}
				className="form__input--text"
				type="text"
				onChange={handleSearch}
			/>

			<Todos hasMore={hasMore} lastEl={lastEl} />
			{loading && (
				<div className="loading">
					<i className="fas fa-circle-notch loading--spinner"></i>
				</div>
			)}
			<button className="btn" onClick={() => setVisible(!visible)}>
				<a href="#add-todo">Add Todo</a>
			</button>
		</div>
	);
};

export default Home;
