import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import { dateParser } from '../util/helperFunctions';

export const ListItem = ({ children, list, fetchListTodos, deleteList }) => {
	const todoContext = useContext(TodoContext);
	const { fetchData } = todoContext;
	const hideTodos = () => {
		if (list.todos) {
			delete list.todos;
			fetchData();
		} else {
			fetchListTodos(list.id);
		}
	};
	return (
		<li
			className="list-info__list-item"
			style={{ backgroundColor: list.color }}
		>
			<span className="list-info__span list-info__span--name">{list.name}</span>
			<span className="list-info__span list-info__span--date">
				{dateParser(list.created_at)}
			</span>
			<div className="u-float-right list-info__icons">
				<span
					onClick={() => deleteList(list.id)}
					className="todos__icon list-info__span list-info__span--delete"
				>
					<i className="fas fa-trash-alt"></i>
				</span>
				<span
					onClick={hideTodos}
					className="todos__icon list-info__span list-info__span--info"
				>
					<i className="fas fa-cog list-info__icons--info"></i>
				</span>
			</div>
			{children}
		</li>
	);
};
