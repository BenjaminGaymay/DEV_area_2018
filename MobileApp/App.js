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
import LinkAction from "./src/pages/Link/Action";
import LinkReaction from "./src/pages/Link/Reaction";

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Login: {screen: Login},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Logout: {screen: Logout},
  LinkAction: {screen: LinkAction},
  LinkReaction: {screen: LinkReaction},
});

const App = createAppContainer(AppNavigator);

export default App;
