import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Header from './layout/Header';
import Home from './pages/Home';
import TodoInfo from './pages/TodoInfo';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
						<Route path="/login" exact component={Login} />
						<Route path="/signup" component={SignUp} />
						<Route path="/:id" render={props => <TodoInfo {...props} />} />
						<Route path="/" exact component={Home} />
					</Switch>
				</TodoState>
			</UserState>
		</Router>
	);
}

export default App;
