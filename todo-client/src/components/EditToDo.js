import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
//UTILS
import ApiHelper from '../util/ApiHelper';
//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';

const EditToDo = ({
	visible,
	refr,
	id,
	title,
	urgency,
	description,
	date_todo,
	setError,
}) => {
	const { handleChange, handleSubmit, values } = useForm(submit);
	const todoContext = useContext(TodoContext);
	const { fetchData } = todoContext;
	async function submit() {
		try {
			//Send addtodo
			const res = await ApiHelper.updateTodo(id, values);
			refr();
			fetchData();
			visible(false);
		} catch (err) {
			setError(err);
		}
	}
	return (
		<div className="popup-container" id="edit-todo">
			<form className="popup-container__content form" onSubmit={handleSubmit}>
				<span className="close-tag" onClick={() => visible(false)}>
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
					onChange={handleChange}
					placeholder={title}
				/>
				<label forhtml="date" className="form__label">
					Todo Date
				</label>
				<input
					type="date"
					name="date_todo"
					id="date"
					className="form__input"
					onChange={handleChange}
					placeholder={date_todo}
				/>
				<label forhtml="urgency" className="form__label">
					Urgency
				</label>
				<select
					name="urgency"
					id="urgency"
					className="form__input"
					onChange={handleChange}
					value={urgency}
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
					onChange={handleChange}
					placeholder={description}
				></textarea>
				<button type="submit" className="btn">
					Edit todo
				</button>
			</form>
		</div>
	);
};

export default EditToDo;
