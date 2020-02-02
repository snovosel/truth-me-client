import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

class SetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: "",
      uri: null
    };

    this.handleOnSend = this.handleOnSend.bind(this);
  }

  handleOnSend() {
    fetch("http://psst.novowd.com/fortune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          uri: data.key
        });
      });
  }

  render() {
    const link = this.state.uri;
    return (
      <Fragment>
        <p className="text">
          Write in your recipients "Fortune" (write it as if you are giving the
          fortune directly to them. Use words like "you" instead of "they")
        </p>
        <textarea
          value={this.state.fortune}
          onChange={e => this.setState({ fortune: e.target.value })}
        />
        <button onClick={this.handleOnSend}>Send</button>
        {this.state.uri && (
          <Link className="link" to={link}>
            localhost:3000/fortune/{this.state.uri}
          </Link>
        )}
      </Fragment>
    );
  }
}

export default SetUp;
