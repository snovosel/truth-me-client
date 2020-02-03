import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

class SetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: "",
      uri: null,
      copied: false
    };

    this.handleOnSend = this.handleOnSend.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  handleOnSend() {
    const { fortune, uri } = this.state;
    if (fortune !== " " && fortune !== null && fortune !== "" && uri === null) {
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
  }

  handleCopyClick(e) {
    window.navigator.clipboard.writeText(`localhost:3000/${this.state.uri}`);

    this.setState({
      copied: true
    });
  }

  render() {
    const link = this.state.uri;
    return (
      <Fragment>
        <div className="text-container">
          <p className="text">Write in your target's "Fortune". </p>
          <p className="text">
            Once complete, click "create fortune" and send the link to your
            target.
          </p>
        </div>
        <textarea
          className="fortune-textarea"
          value={this.state.fortune}
          onChange={e => this.setState({ fortune: e.target.value })}
          disabled={this.state.uri !== null}
        />
        <button onClick={this.handleOnSend}>Create Fortune</button>
        {this.state.uri && (
          <p onClick={this.handleCopyClick} className="link">
            localhost:3000/{this.state.uri}
          </p>
        )}
        {this.state.copied ? (
          <p className="copied">copied to clipboard</p>
        ) : (
          <p className="hidden" />
        )}
      </Fragment>
    );
  }
}

export default SetUp;
