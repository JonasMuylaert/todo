import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../context/todo/todoContext';
//UTIL
import ApiHelper from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';

export const ListInfo = () => {
	const todoContext = useContext(TodoContext);
	const { setError, error, setLoading, loading, fetchData } = todoContext;
	const [lists, setLists] = useState([]);
	const [todos, setTodos] = useState([]);
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
			const res = await ApiHelper.getTodos({ list_id: id });
			setTodos(res.data);
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
				{lists.map(list => {
					return (
						<li
							key={list.id}
							className="list-info__list-item"
							style={{ backgroundColor: list.color }}
						>
							<span className="list-info__span list-info__span--name">
								{list.name}
							</span>
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
									onClick={() =>
										todos.length >= 1 ? setTodos([]) : fetchListTodos(list.id)
									}
									className="todos__icon list-info__span list-info__span--info"
								>
									<i className="fas fa-cog list-info__icons--info"></i>
								</span>
							</div>
							<ul className="list-info__todos">
								{todos.map(todo => (
									<li key={todo.id} className="list-info__todos-list">
										<Link c to={`/${todo.id}`}>
											{todo.title}
										</Link>
									</li>
								))}
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
