import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Error from "../src/Pages/Error";
import Home from "../src/Pages/Home";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path = "/" component = { Home } />
						<Route component = { Error } />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
