import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Header from './layout/Header';
import Home from './pages/Home';
import TodoInfo from './pages/TodoInfo';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import NotFound from './pages/NotFound';
import AddToDo from './components/AddToDo';

import ProtectedRoute from './components/ProtectedRoute';

import TodoState from './context/todo/todoState';
import UserState from './context/user/userState';

import './style/main.css';

function App() {
	return (
		<Router>
			<UserState>
				<TodoState>
					<Header>
						<Navbar />
					</Header>
					<Switch>
						<Route path="/" exact component={Home} />
						<ProtectedRoute path="/user" exact component={User} />
						<Route path="/login" exact component={Login} />
						<Route path="/signup" exact component={SignUp} />
						<Route
							path="/todos/:id"
							exact
							render={props => <TodoInfo {...props} />}
						/>
						<Route path="*" exact component={NotFound} />
					</Switch>
				</TodoState>
			</UserState>
		</Router>
	);
}

export default App;
