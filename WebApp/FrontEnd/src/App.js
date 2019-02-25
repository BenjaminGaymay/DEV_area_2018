import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./guard/PrivateRoute";

//Components
import ButtonAppBar from "./components/Appbar/Appbar";
import Footer from "./components/Footer/Footer";

//Context
import Context from "./context/context";

//pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";

const App = () => {
  const context = useContext(Context);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!!username && !!password) {
      context.setUser({
        username,
        password,
        isLogged: true
      });
    }
  });

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
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;