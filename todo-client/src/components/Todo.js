import React, { useContext } from 'react';
import { ApiHelper } from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';
import TodoContext from '../context/todo/todoContext';

import { Link } from 'react-router-dom';

const Todo = ({ id, urgency, firstName, lastName, date, children, done }) => {
	const todoContext = useContext(TodoContext);
	const apiHelper = new ApiHelper(todoContext);
	return (
		<li className={`todos__item ${urgency} ${done ? 'done' : ''}`}>
			<div className="todos__name">
				{firstName} {lastName}
			</div>
			<span className="todos__date">{dateParser(date)}</span>
			<Link to={`/${id}`}>
				<div className="todos__content">{children}</div>
			</Link>
			<span
				onClick={() =>
					apiHelper.deleteTodo(id).then(res => {
						console.log(res);
						apiHelper.getTodos();
					})
				}
				className="todos__icon todos__icon--delete"
			>
				<i className="fas fa-trash-alt"></i>
			</span>
			<span
				onClick={() =>
					apiHelper.setDone(id, done).then(res => apiHelper.getTodos())
				}
				className="todos__icon todos__icon--done"
			>
				<i className="fas fa-check-circle"></i>
			</span>
		</li>
	);
};

export default Todo;
