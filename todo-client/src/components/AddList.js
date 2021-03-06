import React, { useState, useContext, useEffect } from 'react';
import InputColor from 'react-input-color';

import TodoContext from '../context/todo/todoContext';
//UTIL
import ApiHelper from '../util/ApiHelper';
//CUSTOM HOOKS
import { useForm } from '../hooks/useForm';

const AddList = props => {
	const todoContext = useContext(TodoContext);
	const { loading, error, fetchData, setError, setLoading } = todoContext;
	const [handleSubmit, handleChange, values] = useForm(submit);
	const [color, setColor] = useState({});
	const [todos, setTodos] = useState([]);
	values.color = color.hex; //mute values object
	async function submit() {
		try {
			setLoading(true);
			const res = await ApiHelper.addTodo(values);
			fetchData();
			props.visible();
		} catch (err) {
			setError(err.response);
		} finally {
			setLoading(false);
		}
	}
	const fetchTodos = async () => {
		try {
			const res = await ApiHelper.getTodos({ list: 1 });
			setTodos(res.data.todos);
		} catch (error) {
			setError(error.response);
		}
	};
	useEffect(() => {
		fetchTodos();
	}, []);
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
						<option id="default">No todo</option>
						{todos.map((el, index) => (
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

export default AddList;
