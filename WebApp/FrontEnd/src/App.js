import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./guard/PrivateRoute";

//Components
import ButtonAppBar from "./components/Appbar/Appbar";

//Context
import Context from "./context/context";

//pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";

class AppConsumer extends React.Component {
  componentWillMount() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!!username && !!password) {
      this.props.context.setUser({
        username,
        password,
        isLogged: true
      });
    }
  }

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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
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

const App = () => (
  <Context.Consumer>
    {context => <AppConsumer context={context} />}
  </Context.Consumer>);

export default App;
