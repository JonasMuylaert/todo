import React, { useContext, useEffect, useState } from 'react';
//PAGE
import EditTodo from '../components/EditToDo';
//UTIL
import ApiHelper from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';
//CUSTOM HOOKS

const TodoInfo = props => {
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(false);
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(false);

	const { id } = props.match.params;

	const fetchData = async () => {
		setError(false);
		try {
			setLoading(true);
			const res = await ApiHelper.getTodo(id);
			console.log(res);
			setTodo(...res.data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const setErr = val => {
		setError(val);
	};
	const setVis = val => {
		setVisible(val);
	};
	if (todo) {
		return (
			<div className="todo-card">
				{visible ? (
					<EditTodo
						id={id}
						title={todo.title}
						date={new Date(todo.date_todo)}
						urgency={todo.urgency}
						description={todo.description}
						visible={setVis}
						refr={fetchData}
						setError={setErr}
					/>
				) : null}
				<div className="todo-info">
					<h2 className="todo-info__title secundary-title">{todo.title}</h2>
					<div className="todo-info__user">
						<span className="todo-info__key">Author: </span>
						<span className="todo-info__value">
							{todo.first_name} {todo.last_name}
						</span>
					</div>
					<div className="todo-info__date">
						<span className="todo-info__key">Todo date: </span>
						<span className="todo-info__value">
							{dateParser(todo.date_todo)}
						</span>
					</div>
					<div className="todo-info__list">
						<span className="todo-info__key">list: </span>
						<span className="todo-info__value">{todo.name}</span>
					</div>
					<div className="todo-info__description">
						<span className="todo-info__key">Description: </span>
						<span className="todo-info__value">{todo.description}</span>
					</div>
				</div>
				<button
					className="btn btn--green u-float-right"
					onClick={() => setVisible(!visible)}
				>
					<a className="btn__text" href="#edit-todo">
						Edit
					</a>
				</button>
			</div>
		);
	} else {
		return (
			<div>
				{error && (
					<div className="error">An error occured...Try again later</div>
				)}
				{loading && loading && (
					<div className="loading">
						<i className="fas fa-circle-notch loading--spinner"></i>
					</div>
				)}
			</div>
		);
	}
};

export default TodoInfo;