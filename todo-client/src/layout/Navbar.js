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
					{isAuth && (
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
					)}
					{isAuth ? (
						<Fragment>
							<li className="u-float-right">
								<NavLink
									to="/"
									onClick={() => {
										localStorage.removeItem('Authorization');
										setAuth(false);
									}}
									className="nav__list-item"
								>
									Logout
								</NavLink>
							</li>
							<li className="u-float-right">
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
						</Fragment>
					) : (
						<Fragment>
							<li className="u-float-right">
								<NavLink
									exact
									to="/login"
									className="nav__list-item"
									activeClassName="nav__list-item--active"
									exact
								>
									Login
								</NavLink>
							</li>
							<li className="u-float-right">
								<NavLink
									exact
									to="/signup"
									className="nav__list-item"
									activeClassName="nav__list-item--active"
									exact
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
