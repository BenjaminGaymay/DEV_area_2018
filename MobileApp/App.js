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
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register";

const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
  Register: {screen: Register},
});

const App = createAppContainer(AppNavigator);

export default App;
