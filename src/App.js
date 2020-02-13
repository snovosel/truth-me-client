import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SetUp from "./features/SetUp";
import Fortune from "./features/Fortune";

import "./App.scss";

const App = () => (
  <div className="container">
    <Router>
      <Switch>
        <Route path="/config" component={SetUp} />
        <Route path="/fortune/:fortuneId?" component={Fortune} />
      </Switch>
    </Router>
  </div>
);

export default App;
