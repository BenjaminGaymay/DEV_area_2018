import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import Context from "../../context/context";

const Logout = () => {
  const context = useContext(Context);
  context.setUser({
    isLogged: false,
    username: "",
    password: ""
  });
  return <Redirect to="/" />;
};

export default Logout;