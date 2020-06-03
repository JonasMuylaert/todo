import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../context/todo/todoContext';
import EditTodo from '../components/EditToDo';
import { ApiHelper } from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';

const TodoInfo = props => {
	const todoContext = useContext(TodoContext);
	const [todo, setTodo] = useState({});
	const [visible, setVisible] = useState(false);

	const { error, loading } = todoContext;
	const apiHelper = new ApiHelper(todoContext);
	const { id } = props.match.params;
	useEffect(() => {
		const fetchData = () => {
			apiHelper.getTodo(id).then(res => {
				setTodo(...res.data);
			});
		};
		fetchData();
	}, [id]);

	const updateTodo = val => {
		setTodo(val);
	};
	const setVis = val => {
		setVisible(val);
	};
	return (
		<div>
			{visible ? (
				<EditTodo
					id={id}
					title={todo.title}
					date={new Date(todo.date_todo)}
					urgency={todo.urgency}
					description={todo.description}
					visible={setVis}
					setTodo={updateTodo}
				/>
			) : null}
			{error && <div className="error">An error occured...Try again later</div>}
			{loading && <div className="loading--spinner"></div>}
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
					<span className="todo-info__value">{dateParser(todo.date_todo)}</span>
				</div>
				<div className="todo-info__description">
					<span className="todo-info__key">Description: </span>
					<span className="todo-info__value">{todo.description}</span>
				</div>
			</div>
			<button className="btn" onClick={() => setVisible(!visible)}>
				<a href="#edit-todo">Edit</a>
			</button>
		</div>
	);
};

export default TodoInfo;
