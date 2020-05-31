import React from 'react';

const Todo = props => {
	return (
		<li className="todos__item">
			<div className="todos__content">{props.children}</div>
			<span className="todos__close">&times;</span>
		</li>
	);
};

export default Todo;
