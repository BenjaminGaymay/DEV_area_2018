import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/context";

const PrivateRoute = props => {
  const context = useContext(Context);
  if (!context.isLogged) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default PrivateRoute;
