import React, { useContext, useRef, useCallback } from 'react';
import Todo from './Todo';
import TodoContext from '../context/todo/todoContext';

const Todos = props => {
	const todoContext = useContext(TodoContext);

	const { todos, loading, setPage } = todoContext;
	const observer = useRef();
	const lastElementRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && props.hasMore) {
				setPage();
			}
		});
		if (node) observer.current.observe(node);
	});

	const shortenTitle = (title, maxLength) => {
		if (title.length >= maxLength) {
			const strArr = title.split('');
			const newStrArr = strArr.slice(0, maxLength - 1);
			return newStrArr.join('').concat('...');
		}
		return title;
	};

	return (
		<div className="todos-container">
			<ul className="todos">
				{todos.map((todo, index) => {
					if (todos.length === index + 1) {
						return (
							<Todo key={index} urgency={todo.urgency}>
								<h3 ref={lastElementRef} className="todos__title">
									{todo.title ? shortenTitle(todo.title, 15) : null}
								</h3>
							</Todo>
						);
					} else {
						return (
							<Todo key={index} urgency={todo.urgency}>
								<h3 className="todos__title">
									{todo.title ? shortenTitle(todo.title, 15) : null}
								</h3>
							</Todo>
						);
					}
				})}
			</ul>
		</div>
	);
};

export default Todos;
