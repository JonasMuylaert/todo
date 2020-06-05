import { useEffect, useState, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import ApiHelper from '../util/ApiHelper';

export const useApi = (method, ...params) => {
	const todoContext = useContext(TodoContext);
	const { setTodos, setLoading, setError, loading, error } = todoContext;
	const [data, setData] = useState(null);
	const [hasMore, setHasMore] = useState(false);
	const [page, setPage] = useState(1);

	const fetchData = async () => {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper[method](...params);
			setTodos(res.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return [loading, error, data, fetchData, hasMore, setPage];
};
