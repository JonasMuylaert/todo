import { useEffect, useContext, useState, clearTodos } from 'react';
import axios from 'axios';
import TodoContext from '../context/todo/todoContext';

export const useSearch = (title, page) => {
	const todoContext = useContext(TodoContext);
	const [hasMore, setHasMore] = useState(false);
	const { setTodos, setLoading, setError, clearTodos } = todoContext;
	let cancel;
	useEffect(() => {
		clearTodos();
		setLoading(true);
		setError(false);
		axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/',
			params: { title: title },
			cancelToken: new axios.CancelToken(c => (cancel = c)),
		})
			.then(res => {
				console.log(res);
				setTodos(res.data);
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch(err => {
				if (axios.isCancel(err)) return;
				setError(true);
			});

		return () => cancel();
	}, [title, page]);
	return hasMore;
};
