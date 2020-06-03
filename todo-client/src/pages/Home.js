import React, { useState, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import Todos from '../components/Todos.js';
import AddToDo from '../components/AddToDo';

import { useGetTodos } from '../hooks/useGetTodos';
import { useSearch } from '../hooks/useSearch';
const Home = () => {
	const todoContext = useContext(TodoContext);

	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState('');

	const { loading, error, page } = todoContext;
	const setVis = val => {
		setVisible(val);
	};
	const handleSearch = e => {
		setQuery(e.target.value);
	};
	const hasMore = {
		todoHasMore: useGetTodos(page),
		// searchHasMore: useSearch(query, page),
	};

	return (
		<div>
			{visible ? <AddToDo visible={setVis} /> : null}
			{error && <div className="error">An error occured...Try again later</div>}
			<input
				value={query}
				className="form__input form__input--search"
				type="text"
				onChange={handleSearch}
			/>
			<button className="btn" onClick={() => setVisible(!visible)}>
				<a href="#add-todo">Add Todo</a>
			</button>
			<Todos key={1} hasMore={hasMore.todoHasMore} />
			{loading && (
				<div className="loading">
					<i className="fas fa-circle-notch loading--spinner"></i>
				</div>
			)}
		</div>
	);
};

export default Home;
