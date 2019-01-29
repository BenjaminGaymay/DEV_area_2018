import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ButtonAppBar from './components/Appbar';
import Error from "../src/Pages/Error";
import Home from "../src/Pages/Home";
import Login from './Pages/Login';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				{/* NIQUE TA RACE, QUAND YA PLUS DE WIFI, METS TA MERDE EN LOCAL */}
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<BrowserRouter>
					<div>
					<ButtonAppBar />
					<Switch>h
						<Route exact path = "/" component = { Home } />
						<Route path="/login" component = { Login } />
						<Route component = { Error } />
					</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
