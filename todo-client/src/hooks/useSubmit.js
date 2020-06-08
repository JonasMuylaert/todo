import { useState, useContext } from 'react';
import ApiHelper from '../util/ApiHelper';
import TodoContext from '../context/todo/todoContext';

export const useSubmit = (cb, apiMethod, ...params) => {
	const todoContext = useContext(TodoContext);
	const { fetchData, setError, setLoading } = todoContext;

	const [visible, setVisible] = useState(true);

	async function submit() {
		try {
			setLoading(true);
			const res = await ApiHelper[apiMethod](...params);
			fetchData();
			setVisible(!visible);
			cb(visible);
		} catch (err) {
			setError(err.response);
		} finally {
			setLoading(false);
		}
	}
	return submit;
};
