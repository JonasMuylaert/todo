import React from 'react';

const Header = props => {
	return (
		<div className="header">
			<h1 className="header__title">Corona, what to do ?</h1>
			{props.children}
		</div>
	);
};

export default Header;
