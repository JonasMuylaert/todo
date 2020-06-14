import { useState, useEffect } from 'react';

export const useForm = apiCallback => {
	const [values, setValue] = useState({});
	const [errors, setErrors] = useState(null);

	const handleChange = e => {
		const { name, value } = e.target;
		setValue({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		//do something
		apiCallback();
		setValue({});
	};

	return [handleChange, handleSubmit, values];
};
