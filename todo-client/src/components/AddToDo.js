import React, { useContext, useState, useEffect } from 'react';
import TodoContext from '../context/todo/todoContext';
//UTIL
import ApiHelper from '../util/ApiHelper';
//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';

const AddToDo = ({
	id,
	title,
	urgency,
	description,
	date_todo,
	visible,
	mode,
	list_id,
	fetchTodo,
}) => {
	const todoContext = useContext(TodoContext);
	const { setError, setLoading, fetchData } = todoContext;
	const [handleChange, handleSubmit, values] = useForm(submit);
	const [lists, setLists] = useState([]);

	const fetchLists = async () => {
		try {
			const res = await ApiHelper.getLists();
			setLists(res.data);
		} catch (error) {
			setError(error.response);
		}
	};
	async function submit() {
		try {
			setLoading(true);
			if (mode === 'add') {
				await ApiHelper.addTodo(values);
				visible();
				fetchData();
			} else if (mode === 'edit') {
				await ApiHelper.updateTodo(id, values);
				fetchTodo();
				visible();
			}
		} catch (err) {
			setError(err.response);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchLists();
	}, []);
	const makeDefault = obj => {
		if (Object.keys(obj).length === 0 && obj.constructor === Object) {
			if (list_id) {
				return list_id;
			}
			return '1';
		}
		return undefined;
	};
	return (
		<div
			className="popup-container"
			id={mode === 'edit' ? 'edit-todo' : 'add-todo'}
		>
			<form className="popup-container__content form" onSubmit={handleSubmit}>
				<span className="close-tag" onClick={() => visible()}>
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
						defaultValue={title}
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
						defaultValue={date_todo}
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
						value={makeDefault(values)}
					>
						<option value="1">No list</option>
						{lists.map(el => (
							<option key={el.id} value={el.id}>
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
						defaultValue={urgency ? urgency : 'default'}
					>
						<option value="default" disabled={true}>
							Choose urgency
						</option>
						<option value="urgent">urgent</option>
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
						placeholder={`${
							description ? description : 'Insert a description'
						} `}
						cols={50}
						onChange={handleChange}
					></textarea>
					<label
						forhtml="description"
						className="form__label form__label--text"
					></label>
				</div>
				<button type="submit" className="btn">
					{mode === 'edit' ? 'edit todo' : 'create todo'}
				</button>
			</form>
		</div>
	);
};

export default AddToDo;
