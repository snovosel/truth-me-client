import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SetUp from "./features/SetUp";
import Fortune from "./features/Fortune";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const containerClass =
      this.state.focused == "true" ? "container-focused" : "container";

    return (
      <div className={containerClass}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => <Fortune {...this.state} {...routeProps} />}
            />
            <Route path="/config" component={SetUp} />

            <Route
              path="/:fortuneId"
              render={routeProps => (
                <Fortune
                  setFocus={focused => this.setState({ focused })}
                  setEyes={eyePosition => this.setState({ eyePosition })}
                  {...this.state}
                  {...routeProps}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
