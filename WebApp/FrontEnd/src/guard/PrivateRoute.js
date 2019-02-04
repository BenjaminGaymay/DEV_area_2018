import React from "react";
import { Route, Redirect } from "react-router-dom";

import Context from "../context/context";

class PrivateRouteConsumer extends React.Component {
  render() {
    if (!this.props.context.isLogged) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props} />;
  }
}

const PrivateRoute = props => {
  return (
    <Context.Consumer>
      {context => <PrivateRouteConsumer context={context} />}
    </Context.Consumer>
  );
};

export default PrivateRoute;