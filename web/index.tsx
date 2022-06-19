import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./style";
import { HashRouter } from "react-router-dom";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
