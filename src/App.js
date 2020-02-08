import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SetUp from "./features/SetUp";
import Fortune from "./features/Fortune";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      focused: false
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.height < this.state.height) {
      this.setState({
        focused: false
      });
    }

    if (prevState.height > this.state.height) {
      this.setState({
        focused: true
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ height: window.innerHeight });
  }

  render() {
    console.log("this.state.height", this.state.height);

    const styleHeight = {
      color: "white",
      position: "absolute",
      top: "50%",
      left: "0%",
      zIndex: 999
    };

    const focusedHeight = {
      color: "white",
      position: "absolute",
      top: "25%",
      left: "0%",
      zIndex: 999
    };

    return (
      <div className="container">
        <p style={focusedHeight}>{this.state.focused}</p>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Fortune
                  setFocus={focused => this.setState({ focused })}
                  setEyes={eyePosition => this.setState({ eyePosition })}
                  {...this.state}
                  {...routeProps}
                />
              )}
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
