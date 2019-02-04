import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Context from "../../context/context";

import './Appbar.css';

function AppBarConsumer(props) {
  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className="menuButton"
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className="grow">
            Area
          </Typography>
          <Button color="inherit">
            <Link to="/">Home</Link>
          </Button>
          <Button color="inherit">
          {
            !props.context.isLogged ?
            <Link to="/login">Login</Link> :
            <Link to="/logout">Logout</Link>
          }
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const ButtonAppBar = () => (
  <Context.Consumer>
    {context => <AppBarConsumer context={context} />}
  </Context.Consumer>
);

export default ButtonAppBar;
