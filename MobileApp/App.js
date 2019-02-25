/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";
import Home from "./src/pages/Home"
import Login from "./src/pages/Login"
import Register from "./src/pages/Register";
import Dashboard from "./src/pages/Dashboard";
import Logout from "./src/pages/Logout";

const AppNavigator = createStackNavigator({
  Dashboard: {screen: Dashboard},
  Home: {screen: Home},
  Login: {screen: Login},
  Register: {screen: Register},
  Logout: {screen: Logout}
});

const App = createAppContainer(AppNavigator);

export default App;
