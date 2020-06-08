import React, { useContext, Fragment } from 'react';
import TodoContext from '../context/todo/todoContext';
import UserContext from '../context/user/userContext';
import { Link } from 'react-router-dom';
//UTIL
import ApiHelper from '../util/ApiHelper';
import { dateParser } from '../util/helperFunctions';

const Todo = ({ id, firstName, lastName, date, children, done, color }) => {
	const todoContext = useContext(TodoContext);
	const userContext = useContext(UserContext);
	const { setLoading, setError, fetchData } = todoContext;
	const { isAuth } = userContext;
	const delTodo = async id => {
		try {
			setLoading(true);
			const res = await ApiHelper.deleteTodo(id);
			if (res.status === 200) {
				fetchData();
			}
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	const setDone = async done => {
		try {
			setLoading(true);
			const res = await ApiHelper.updateTodo(id, { done: done === 0 ? 1 : 0 });
			console.log(res);
			if (res.status === 202) {
				fetchData();
			}
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};

	return (
		<li
			className={`todos__item  ${done ? 'done' : ''}`}
			style={{ borderColor: color }}
		>
			<div className="todos__name">
				{firstName} {lastName}
			</div>
			<span className="todos__date">{dateParser(date)}</span>
			<Link to={`/todos/${id}`} className="todos__link">
				<div className="todos__content">{children}</div>
			</Link>
			{isAuth && (
				<Fragment>
					<span
						onClick={() => delTodo(id)}
						className="todos__icon todos__icon--delete"
					>
						<i className="fas fa-trash-alt"></i>
					</span>
					<span
						onClick={() => setDone(done)}
						className="todos__icon todos__icon--done"
					>
						<i className="fas fa-check-circle"></i>
					</span>
				</Fragment>
			)}
		</li>
	);
};

export default Todo;
