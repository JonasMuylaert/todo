import React, { useContext, useState, useEffect } from 'react';
import TodoContext from '../context/todo/todoContext';
import ApiHelper from '../util/ApiHelper';

import InputColor from 'react-input-color';
//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';
import { useApi } from '../hooks/useApi';

const AddToDo = props => {
	const { handleSubmit, handleChange, values } = useForm(submit);
	const [color, setColor] = useState({});
	const todoContext = useContext(TodoContext);
	const { fetchData, setError } = todoContext;
	async function submit() {
		try {
			//Send addtodo
			const res = await ApiHelper.addList(values);
			fetchData();

			props.visible(false);
		} catch (err) {
			setError(err);
		}
	}
	return (
		<div className="popup-container" id="add-list">
			<form className="popup-container__content form" onSubmit={handleSubmit}>
				<span className="close-tag" onClick={() => props.visible(false)}>
					&times;
				</span>
				<div className="form__section">
					<input
						autoComplete="off"
						type="text"
						name="name"
						id="name"
						className="form__input"
						onChange={handleChange}
						required
					/>
					<label forhtml="name" className="form__label form__label--text">
						<span className="form__span">List name:</span>
					</label>
				</div>
				<div className="form__section form__section--select">
					<select
						name="todos"
						id="todos"
						className="form__input form__input--select"
						onChange={handleChange}
						defaultChecked="default"
					>
						<option id="default">No list</option>
						{props.noListTodo.map((el, index) => (
							<option key={index} value={el.id}>
								{el.title}
							</option>
						))}
					</select>
					<label forhtml="todos" className="form__label form__label--select">
						<span className="form__span form__span--select">
							Add todos to list:
						</span>
					</label>
				</div>
				<div className="form__color--section">
					<label forhtml="color" className="form__color--label">
						<span className="form__color--span">Choose a color scheme:</span>
					</label>
					<InputColor
						name="color"
						className="color"
						initialValue="#5e72e4"
						onChange={setColor}
						placement="right"
						id="color"
					>
						<div
							style={{
								width: 200,
								height: 50,
								marginTop: 20,
								marginBottom: 20,
								backgroundColor: color.rgba,
							}}
						/>
					</InputColor>
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
						style={{
							margin: 0,
						}}
					></textarea>
					<label
						forhtml="description"
						className="form__label form__label--text"
					></label>
				</div>
				<div className="u-wrapper-center">
					<button type="submit" className="btn">
						Create List
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddToDo;
