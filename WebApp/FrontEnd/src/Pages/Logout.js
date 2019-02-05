import React from "react";
import { Redirect } from "react-router-dom";

import Context from "../context/context";

class LogoutConsumer extends React.Component {
  componentDidMount() {
    this.props.context.setUser({
      isLogged: false,
      username: "",
      password: ""
    });
  }

  render() {
    return <Redirect to="/" />;
  }
}

const Logout = () => (
  <Context.Consumer>
    {context => <LogoutConsumer context={context} />}
  </Context.Consumer>
);

export default Logout;
