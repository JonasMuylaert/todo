import React, { useContext, useRef, useCallback } from 'react';
import Todo from './Todo';
import TodoContext from '../context/todo/todoContext';

import { shortenTitle } from '../util/helperFunctions';

const Todos = props => {
	const todoContext = useContext(TodoContext);

	const { todos, loading, setPage } = todoContext;
	const observer = useRef();
	const lastElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && props.hasMore) {
					setPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[props.hasMore, loading]
	);

	const renderTodo = (todo, index) => {
		if (todos.length === index + 1) {
			return (
				<h3 ref={lastElementRef} className="todos__title last one">
					{todo.title ? shortenTitle(todo.title, 15) : null}
				</h3>
			);
		} else {
			return (
				<h3 ref={lastElementRef} className="todos__title">
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
