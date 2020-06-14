import React, { useEffect, useState, Fragment, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import UserContext from '../context/user/userContext';

import { Error } from '../components/Error';
import { Comments } from '../components/Comments';
//COMPONENT
import AddTodo from '../components/AddToDo';
//UTIL
import ApiHelper from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';
//CUSTOM HOOKS

const TodoInfo = props => {
	const todoContext = useContext(TodoContext);
	const userContext = useContext(UserContext);
	const { loading, error, setError, setLoading } = todoContext;
	const { isAuth } = userContext;
	const [visible, setVisible] = useState(false);
	const [todo, setTodo] = useState(null);

	const { id } = props.match.params;

	const fetchData = async () => {
		setError(false);
		try {
			setLoading(true);
			const res = await ApiHelper.getTodo(id);
			setTodo(...res.data);
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const setVis = val => {
		setVisible(val);
	};
	if (todo) {
		return (
			<Fragment>
				{error && <Error error={error} />}
				<div className="todo-card">
					{visible ? (
						<AddTodo
							id={id}
							title={todo.title}
							date={new Date(todo.date_todo)}
							urgency={todo.urgency}
							description={todo.description}
							visible={setVis}
							mode={'edit'}
							fetchTodo={fetchData}
							list_id={todo.list_id}
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
					{isAuth && (
						<button
							className="btn btn--yellow u-float-right"
							onClick={() => setVisible(!visible)}
						>
							<a className="btn__text" href="#edit-todo">
								Edit
							</a>
						</button>
					)}
				</div>
				<Comments todoId={id} />
			</Fragment>
		);
	} else {
		return (
			<div>
				{error && <Error />}
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
