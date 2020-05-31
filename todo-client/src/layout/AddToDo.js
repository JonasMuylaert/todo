import React, { useContext } from "react";
import TodoContext from "../context/todo/todoContext";

const AddToDo = props => {
	const todoContext = useContext(TodoContext);

	const handleSubmit = async e => {
		e.preventDefault();
		todoContext.postTodo(todoContext.todo);
		todoContext.getTodos();
		props.visible(false);
	};
	return (
		<div className="form-container" id="add-todo">
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
					onChange={todoContext.addTodo}
				/>
				<label forhtml="date" className="form__label">
					Todo Date
				</label>
				<input
					type="date"
					name="date"
					id="date"
					className="form__input"
					onChange={todoContext.addTodo}
				/>
				<label forhtml="urgency" className="form__label">
					Urgency
				</label>
				<select
					name="urgency"
					id="urgency"
					className="form__input"
					onChange={todoContext.addTodo}
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
					onChange={todoContext.addTodo}
				></textarea>
				<button type="submit" className="btn">
					Create todo
				</button>
			</form>
		</div>
	);
};

export default AddToDo;
