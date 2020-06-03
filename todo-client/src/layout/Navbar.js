import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="nav-container">
			<nav className="nav" id="#nav">
				<ul className="nav__list">
					<li>
						<NavLink
							exact
							to="/"
							className="nav__list-item"
							activeClassName="nav__list-item--active"
							exact
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/calendar"
							className="nav__list-item"
							activeClassName="nav__list-item--active"
							exact
						>
							Calendar
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/user"
							className="nav__list-item"
							activeClassName="nav__list-item--active"
							exact
						>
							User
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
