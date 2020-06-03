import { useEffect, useState, useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import { ApiHelper } from '../util/ApiHelper';

export const useGetTodos = () => {
	const todoContext = useContext(TodoContext);
	const { page } = todoContext;
	const apiHelper = new ApiHelper(todoContext);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		const res = apiHelper.getTodos(page).then(res => {
			setHasMore(res.data.length > 0);
		});
	}, [page]);
	console.log(hasMore);
	return hasMore;
};
