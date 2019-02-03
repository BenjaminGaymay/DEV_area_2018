import React, {useState} from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import "./index.css";
// import index from './redux/index';
// import store from "./redux/store";
// import { Provider } from './context';

import Provider from './context';

import App from "./App";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(
  <Provider>
    <App />
  </Provider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
