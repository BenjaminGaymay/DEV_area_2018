import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './guard/PrivateRoute';

//components
import ButtonAppBar from "./components/Appbar/Appbar";

//pages
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <BrowserRouter>
          <div>
            <ButtonAppBar />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
