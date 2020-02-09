import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SetUp from "./features/SetUp";
import Fortune from "./features/Fortune";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight
      // focused: false
    };

    // this.handleSetFocus = this.handleSetFocus.bind(this);
    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  // handleSetFocus(focused) {
  //   this.setState({ focused });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.height < this.state.height) {
  //     this.setState({
  //       focused: false
  //     });
  //   }
  //
  //   if (prevState.height > this.state.height) {
  //     this.setState({
  //       focused: true
  //     });
  //   }
  // }

  // componentDidMount() {
  //   window.addEventListener("resize", this.updateDimensions);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }
  //
  // updateDimensions() {
  //   this.setState({ height: window.innerHeight });
  // }

  render() {
    return (
      <div className="container">
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
              render={routeProps => <Fortune {...this.state} {...routeProps} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
