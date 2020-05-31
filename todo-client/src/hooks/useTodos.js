import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TodoContext from '../context/todo/todoContext';
export const useTodos = (pageNumber, query) => {
	const [hasMore, setHasMore] = useState(false);
	const todoContext = useContext(TodoContext);
	useEffect(() => {
		let cancel;
		const { setTodos, setLoading, setError } = todoContext;
		setLoading(true);
		setError(false);
		axios({
			method: 'GET',
			url: 'http://openlibrary.org/search.json',
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken(cancelToken => (cancel = cancelToken)),
		})
			.then(res => {
				console.log(res.data);
				setTodos(res.data.docs);
				setHasMore(res.data.docs.length > 0);
				setLoading(false);
			})
			.catch(err => {
				if (axios.isCancel(err)) return;
				setError(true);
			});

		return () => cancel();
	}, [pageNumber, query]);
	return {
		hasMore: hasMore,
	};
};
