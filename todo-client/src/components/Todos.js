import React, { useContext, useRef, useCallback } from 'react';
import TodoContext from '../context/todo/todoContext';

import Todo from './Todo';
//UTIL
import { shortenTitle } from '../util/helperFunctions';

const Todos = () => {
	const todoContext = useContext(TodoContext);
	const { todos, loading } = todoContext;

	const observer = useRef();
	const lastElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					console.log('vis'); //infinite scroll komt hier
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading]
	);

	const renderTodo = (todo, index) => {
		if (todos.length === index + 1) {
			return (
				<h3 ref={lastElementRef} className={`todos__title ${todo.urgency}`}>
					{todo.title ? shortenTitle(todo.title, 15) : null}
				</h3>
			);
		} else {
			return (
				<h3 ref={lastElementRef} className={`todos__title ${todo.urgency}`}>
					{todo.title ? shortenTitle(todo.title, 15) : null}
				</h3>
			);
		}
	};
	return (
		<div className="todos-container">
			<ul className="todos">
				{todos.map((todo, index) => {
					return (
						<Todo
							key={todo.id}
							id={todo.id}
							urgency={todo.urgency}
							firstName={todo.first_name}
							lastName={todo.last_name}
							date={todo.date_todo}
							done={todo.done}
						>
							{renderTodo(todo, index)}
						</Todo>
					);
				})}
			</ul>
		</div>
	);
};

export default Todos;
