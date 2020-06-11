import React from 'react';
import { Link } from 'react-router-dom';
export const TodoItem = ({ todo }) => {
	return (
		<div className="list-info__todos">
			<ul className="list-info__todos-list">
				<li key={todo.id} className="list-info__todos-list-item">
					<Link to={`/todos/${todo.id}`}>{todo.title}</Link>
				</li>
			</ul>
		</div>
	);
};
