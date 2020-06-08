import { useEffect, useState, useContext } from 'react';

import ApiHelper from '../util/ApiHelper';

export const useGetApi = (method, ...params) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	// const [hasMore, setHasMore] = useState(false);
	// const [page, setPage] = useState(1);

	const fetchData = async () => {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper[method](...params);
			setData(res.data);
		} catch (err) {
			setError(err.respone);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return [loading, error, data, fetchData];
};
