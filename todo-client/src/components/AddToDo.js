import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';

import { ApiHelper } from '../util/ApiHelper';

const AddToDo = props => {
	const todoContext = useContext(TodoContext);
	const apiHelper = new ApiHelper(todoContext);
	const { setTodo, todo } = todoContext;
	const handleSubmit = e => {
		e.preventDefault();
		apiHelper.addTodo(todo).then(res => {
			console.log(res);
			apiHelper.getTodos();
		});
		props.visible(false);
	};

	return (
		<div className="popup-container" id="add-todo">
			<form className="popup-container__content form" onSubmit={handleSubmit}>
				<span className="close-tag" onClick={() => props.visible(false)}>
					&times;
				</span>
				<label forhtml="title" className="form__label">
					Todo title
				</label>
				<input
					type="text"
					name="title"
					id="title"
					className="form__input"
					onChange={setTodo}
				/>
				<label forhtml="date" className="form__label">
					Todo Date
				</label>
				<input
					type="date"
					name="date_todo"
					id="date"
					className="form__input"
					onChange={setTodo}
				/>
				<label forhtml="list" className="form__label">
					Add to list
				</label>
				<select
					name="list"
					id="list"
					className="form__input"
					onChange={setTodo}
				>
					<option value="list-x">list-x</option>
				</select>
				<label forhtml="urgency" className="form__label">
					Urgency
				</label>
				<select
					name="urgency"
					id="urgency"
					className="form__input"
					onChange={setTodo}
				>
					<option value="urgent">urgent</option>
					<option value="very-urgent">very-urgent</option>
					<option value="not-urgent">not-urgent</option>
				</select>
				<label forhtml="description" className="form__label">
					Description
				</label>
				<textarea
					name="description"
					id="description"
					maxLength="255"
					className="form__input form__input--text-area"
					placeholder="Insert a description"
					cols={50}
					onChange={setTodo}
				></textarea>
				<button type="submit" className="btn">
					Create todo
				</button>
			</form>
		</div>
	);
};

export default AddToDo;
