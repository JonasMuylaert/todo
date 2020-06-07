import React from 'react';

export const Error = ({ error }) => {
	return <div className="error">{error.message}</div>;
};
