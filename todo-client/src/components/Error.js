import React, { Fragment, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
export const Error = ({ error }) => {
	const todoContext = useContext(TodoContext);
	const { setError } = todoContext;
	return (
		<div className="error">
			<div className="close-tag" onClick={() => setError(null)}>
				&times;
			</div>
			<p className="error__text">{error.data.message}</p>
		</div>
	);
};
