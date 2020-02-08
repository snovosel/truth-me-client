import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

class SetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: "",
      uri: null,
      copied: false,
      name: ""
    };

    this.handleOnSend = this.handleOnSend.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  handleOnSend() {
    const { fortune, uri, name } = this.state;
    if (fortune !== " " && fortune !== null && fortune !== "" && uri === null) {
      fetch("https://psst.novowd.com/fortune", {
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

      // fetch("http://localhost:8080/fortune", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(this.state)
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     this.setState({
      //       uri: data.key
      //     });
      //   });
    }
  }

  handleCopyClick(e) {
    window.navigator.clipboard.writeText(`demo.novowd.com/${this.state.uri}`);

    this.setState({
      copied: true
    });
  }

  render() {
    const link = this.state.uri;
    return (
      <Fragment>
        <div className="text-container">
          <p className="text">Write in your target's fortune. </p>
          <p className="text">
            Once complete, click "Create Fortune" and send the link to your
            target.
          </p>
        </div>

        <textarea
          className="fortune-textarea"
          value={this.state.fortune}
          onChange={e => this.setState({ fortune: e.target.value })}
          disabled={this.state.uri !== null}
          placeholder="Be specific. This is your chance to shock your target."
        />
        <button onClick={this.handleOnSend}>Create Fortune</button>
        {/* {this.state.uri && (
          <p onClick={this.handleCopyClick} className="link">
            psst.novowd.com/{this.state.uri}
          </p>
        )} */}

        {this.state.uri && (
          <p onClick={this.handleCopyClick} className="link">
            localhost:8008/{this.state.uri}
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
