import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/user/userContext';
const Navbar = () => {
	const userContext = useContext(UserContext);
	const { isAuth, setAuth } = userContext;
	return (
		<header className="nav-container">
			<nav className="nav" id="#nav">
				<ul className="nav__list">
					<li className="nav__list-item">
						<NavLink
							exact
							to="/"
							className="nav__list-item-link"
							activeClassName="nav__list-item-link--active"
						>
							Home
						</NavLink>
					</li>
					{isAuth && (
						<li className="nav__list-item">
							<NavLink
								exact
								to="/calendar"
								className="nav__list-item-link"
								activeClassName="nav__list-item--active"
							>
								Calendar
							</NavLink>
						</li>
					)}
					{isAuth ? (
						<Fragment>
							<li className="u-float-right nav__list-item">
								<NavLink
									to="/"
									onClick={() => {
										localStorage.removeItem('Authorization');
										setAuth(false);
									}}
									className="nav__list-item-link"
								>
									Logout
								</NavLink>
							</li>
							<li className="u-float-right nav__list-item">
								<NavLink
									exact
									to="/user"
									className="nav__list-item-link"
									activeClassName="nav__list-item-link--active"
								>
									User
								</NavLink>
							</li>
						</Fragment>
					) : (
						<Fragment>
							<li className="u-float-right nav__list-item">
								<NavLink
									exact
									to="/login"
									className="nav__list-item-link"
									activeClassName="nav__list-item-link--active"
								>
									Login
								</NavLink>
							</li>
							<li className="u-float-right nav__list-item">
								<NavLink
									exact
									to="/signup"
									className="nav__list-item-link"
									activeClassName="nav__list-item-link--active"
								>
									Signup
								</NavLink>
							</li>
						</Fragment>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
