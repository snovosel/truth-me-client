import React, { Component, Fragment } from "react";

import Genie from "../Genie";

import FortuneInput from "../../components/FortuneInput";

import "./index.scss";

const lamp = require("../../unnamedopaque.png");

class Fortune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: null,
      question: "",
      showFortune: false,
      questionPosed: false
    };
  }

  componentDidMount() {
    const fortuneId = this.props.match.params.fortuneId;

    if (fortuneId) {
      this.props.history.replace("/");

      fetch("https://psst.novowd.com/fortune/" + fortuneId)
        .then(response => response.json())
        .then(data => {
          this.setState({
            fortune: data.fortune
          });
        });
    }
  }

  render() {
    const questionClass =
      this.state.questionPosed === true
        ? "question-container-posed"
        : "question-container-regular";

    const focusedClass = this.props.focused == "true" ? "#2c2122" : "#1a1a1a";

    if (this.state.fortune && this.state.showFortune) {
      return <p className="fortune">{this.state.fortune}</p>;
    } else {
      return (
        <Fragment>
          <Genie questionPosed={this.state.questionPosed} {...this.props} />
          <div className="fortune-container">
            <FortuneInput
              questionPosed={this.state.questionPosed}
              setQuestionPosed={posed =>
                this.setState({ questionPosed: posed })
              }
              {...this.props}
            />
            <div
              className={questionClass}
              style={{ backgroundColor: focusedClass }}
              onMouseEnter={() => this.setState({ questionPosed: true })}
              onMouseLeave={() => this.setState({ questionPosed: false })}
              onClick={() => this.setState({ showFortune: true })}
            >
              <p>Find your fortune</p>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Fortune;
