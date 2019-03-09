import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Context from "../../context/context";

import "./Appbar.css";

function navIsLoggedIn() {
  return (
    <div>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/logout">
        Logout
      </Button>
    </div>
  );
}

function navIsNotLoggedIn() {
  return (
    <div>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </div>
  );
}

const ButtonAppBar = props => {
  const context = useContext(Context);

  return (<div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="grow">
            Area
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/client.apk">
            Télecharger l'appli
          </Button>
          {context.isLogged ? navIsLoggedIn() : navIsNotLoggedIn()}
        </Toolbar>
      </AppBar>
    </div>);
};

export default ButtonAppBar;
