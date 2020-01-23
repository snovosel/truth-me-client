import React, { Component, Fragment } from "react";

import Genie from "../Genie";

import FortuneInput from "../../components/FortuneInput";

import "./index.scss";

class Fortune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: null,
      question: "",
      showFortune: false
    };
  }

  componentDidMount() {
    const fortuneId = this.props.match.params.fortuneId;

    if (fortuneId) {
      fetch("http://localhost:3030/fortune/" + fortuneId)
        .then(response => response.json())
        .then(data => {
          this.setState({
            fortune: data.fortune
          });
        });
    }
  }

  render() {
    if (this.state.fortune && this.state.showFortune) {
      return this.state.fortune;
    } else {
      return (
        <Fragment>
          <Genie {...this.props} />
          <div className="fortune-container">
            <p>You have awakened the genie...</p>
            <FortuneInput {...this.props} />
            <button
              disabled={!this.state.question}
              onClick={() => this.setState({ showFortune: true })}
            >
              Ask away
            </button>
          </div>
        </Fragment>
      );
    }
  }
}

export default Fortune;
