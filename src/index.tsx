// Polyfills
import "react-app-polyfill/ie11"; //imports core-js/es6/symbol and core-js/fn/array/from'

import "core-js/es6/object";
import "core-js/es6/function";
import "core-js/es6/parse-int";
import "core-js/es6/parse-float";
import "core-js/es6/number";
import "core-js/es6/math";
import "core-js/es6/string";
import "core-js/es6/date";
import "core-js/es6/array";
import "core-js/es6/regexp";
import "core-js/es6/map";
import "core-js/es6/weak-map";
import "core-js/es6/set";
// Polyfills END

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
