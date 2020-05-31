import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Header from './layout/Header';
import Home from './pages/Home';

import TodoState from './context/todo/todoState';

import './style/main.css';
function App() {
	return (
		<TodoState>
			<Router>
				<Header>
					<Navbar />
				</Header>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/calendar">
						{/* <Calendar /> */}
					</Route>
					<Route exact path="/user">
						{/* {user} */}
					</Route>
				</Switch>
			</Router>
		</TodoState>
	);
}

export default App;
