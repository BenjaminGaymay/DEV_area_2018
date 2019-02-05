import React from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/context";

const PrivateRouteConsumer = ({ context, props }) => {
  if (!context.isLogged) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

const PrivateRoute = props => {
  return (
    <Context.Consumer>
      {context => <PrivateRouteConsumer context={context} props={props} />}
    </Context.Consumer>
  );
};

export default PrivateRoute;
