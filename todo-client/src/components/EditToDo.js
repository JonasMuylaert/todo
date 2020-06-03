import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';

import { ApiHelper } from '../util/ApiHelper';

const EditToDo = props => {
	const todoContext = useContext(TodoContext);
	const apiHelper = new ApiHelper(todoContext);
	const { setTodo, todo, page } = todoContext;
	const handleSubmit = e => {
		e.preventDefault();
		apiHelper
			.editTodo(props.id, todo)
			.then(res => apiHelper.getTodo(props.id))
			.then(res => {
				props.setTodo(...res.data);
				props.visible(false);
			});
	};
	return (
		<div className="form-container" id="edit-todo">
			<form className="form-container__form form" onSubmit={handleSubmit}>
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
					placeholder={props.title}
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
					placeholder={props.date_todo}
				/>
				<label forhtml="urgency" className="form__label">
					Urgency
				</label>
				<select
					name="urgency"
					id="urgency"
					className="form__input"
					onChange={setTodo}
					placeholder={props.urgency}
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
					className="form__input"
					placeholder="Insert a description"
					onChange={setTodo}
					placeholder={props.description}
				></textarea>
				<button type="submit" className="btn">
					Edit todo
				</button>
			</form>
		</div>
	);
};

export default EditToDo;
