import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components
import ButtonAppBar from './components/Appbar';

//pages
import Dashboard from './Pages/Dashboard';
import Error from "./Pages/Error";
import Home from "./Pages/Home";
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
					<Switch>
						<Route exact path="/dashboard" component = { Dashboard } />
						<Route exact path = "/" component = { Home } />
						<Route exact path="/login" component = { Login } />
						<Route component = { Error } />
					</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
