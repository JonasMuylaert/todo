import React, { useState, useEffect, useContext } from 'react';
import { ListItem } from './ListItem';
import { TodoItem } from './TodoItem';
import TodoContext from '../context/todo/todoContext';
//UTIL
import ApiHelper from '../util/ApiHelper';

export const ListInfo = () => {
	const todoContext = useContext(TodoContext);
	const { setError, error, setLoading, loading, fetchData } = todoContext;
	const [lists, setLists] = useState([]);
	const fetchLists = async () => {
		try {
			setLoading(true);
			const res = await ApiHelper.getLists();
			setLists(res.data);
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	const fetchListTodos = async id => {
		try {
			setLoading(false);
			const res = await ApiHelper.getTodos({ list: id });
			if (res.data.todos.length >= 1) {
				lists.forEach(list => {
					if (list.id === id) {
						list.todos = res.data.todos;
					}
				});
			}
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	const deleteList = async id => {
		try {
			setLoading(true);
			const res = await ApiHelper.deleteList(id);
			fetchLists();
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchLists();
	}, []);
	return (
		<div className="list-info">
			<ul className="list-info__list">
				{lists.length > 1
					? lists.map(list => {
							return (
								<ListItem
									list={list}
									deleteList={deleteList}
									fetchListTodos={fetchListTodos}
									fetchLists={fetchLists}
								>
									{list.todos &&
										list.todos.map(todo => <TodoItem todo={todo} />)}
								</ListItem>
							);
					  })
					: 'You have no lists'}
			</ul>
		</div>
	);
};
