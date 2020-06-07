import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';

import ApiHelper from '../util/ApiHelper';

//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';
import { useApi } from '../hooks/useApi';

const AddToDo = props => {
	const { handleSubmit, handleChange, values } = useForm(submit);
	const todoContext = useContext(TodoContext);
	const { fetchData, setError } = todoContext;
	async function submit() {
		try {
			//Send addtodo
			const res = await ApiHelper.addTodo(values);
			fetchData();

			props.visible(false);
		} catch (err) {
			setError(err.response);
		}
	}

	return (
		<div className="popup-container" id="add-todo">
			<form className="popup-container__content form" onSubmit={handleSubmit}>
				<span className="close-tag" onClick={() => props.visible(false)}>
					&times;
				</span>
				<div className="form__section">
					<input
						type="text"
						name="title"
						id="title"
						className="form__input"
						onChange={handleChange}
						autoComplete="off"
						required
					/>
					<label forhtml="title" className="form__label form__label--text">
						<span className="form__span">Todo title</span>
					</label>
				</div>
				<div className="form__section">
					<input
						type="date"
						name="date_todo"
						id="date"
						className="form__input form__input--date"
						onChange={handleChange}
					/>
					<label forhtml="date" className="form__label">
						<span className="form__span">Todo Date</span>
					</label>
				</div>
				<div className="form__section form__section--select">
					<select
						name="list_id"
						id="list"
						className="form__input form__input--select"
						onChange={handleChange}
						defaultChecked="default"
						defaultValue={1}
					>
						<option id="default" value={1}>
							No list
						</option>
						{props.lists.map((el, index) => (
							<option key={index} value={el.id}>
								{el.name}
							</option>
						))}
					</select>
					<label forhtml="list" className="form__label form__label--select">
						<span className="form__span form__span--select">Add to list</span>
					</label>
				</div>
				<div className="form__section form__section--select">
					<select
						name="urgency"
						id="urgency"
						className="form__input form__input--select"
						onChange={handleChange}
						defaultValue="urgent"
					>
						<option name="default" disabled={true}>
							Choose urgency
						</option>
						<option namevalue="urgent">urgent</option>
						<option value="very-urgent">very-urgent</option>
						<option value="not-urgent">not-urgent</option>
					</select>
					<label forhtml="urgency" className="form__label form__label--select">
						<span className="form__span form__span--select">Urgency</span>
					</label>
				</div>
				<div className="form__section form__section--description">
					<textarea
						name="description"
						id="description"
						maxLength="255"
						className="form__input form__input--text-area"
						placeholder="Insert a description"
						cols={50}
						onChange={handleChange}
					></textarea>
					<label
						forhtml="description"
						className="form__label form__label--text"
					></label>
				</div>
				<button type="submit" className="btn">
					Create todo
				</button>
			</form>
		</div>
	);
};

export default AddToDo;
