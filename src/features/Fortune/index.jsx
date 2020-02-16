import React, { Component } from "react";

import Genie from "../Genie";

import FortuneInput from "../../components/FortuneInput";
import Response from "./components/Response";

import "./index.scss";

const lamp = require("../../unnamedopaque.png");

const MAGIC_WORDS = "open sesame";

class Fortune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      fortune: null,
      question: "",
      showFortune: false,
      questionPosed: false,
      eyePosition: null,
      magicWords: false,
      unlocked: false,
      focused: "false",
      isMobile: false
    };

    this.handlePoseQuestion = this.handlePoseQuestion.bind(this);
    this.handleSetFocus = this.handleSetFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const fortuneId = this.props.match.params.fortuneId;

    const isMobile = window.screen.width < 600;

    if (fortuneId) {
      this.props.history.replace("/");

      fetch("https://psst.novowd.com/fortune/" + fortuneId)
        .then(response => response.json())
        .then(data => {
          this.setState({
            fortune: data.fortune,
            isMobile
          });
        })
        .catch(error => {
          console.log("error", error);
        });

      // fetch("http://localhost:8080/fortune/" + fortuneId)
      //   .then(response => response.json())
      //   .then(data => {
      //     this.setState({
      //       fortune: data.fortune
      //     });
      //   });
    } else {
      this.setState({
        isMobile
      });
    }
  }

  componentDidUpdate() {
    if (this.state.unlocked === true) {
      setTimeout(() => {
        this.setState({
          showFortune: true
        });
      }, 2000);
    }
  }

  handlePoseQuestion() {
    const lowerCaseVal = this.state.value.toLowerCase();
    if (lowerCaseVal === MAGIC_WORDS) {
      this.setState({
        magicWords: this.state.fortune ? true : false,
        questionPosed: true,
        unlocked: this.state.fortune ? true : false,
        focused: "false"
      });
    }

    if (lowerCaseVal !== MAGIC_WORDS) {
      this.setState({
        magicWords: false,
        questionPosed: true,
        focused: "false"
      });
    }
  }

  renderResponse() {
    if (this.state.magicWords === true) {
      return "You didn't have to know...";
    }

    if (this.state.magicWords === false) {
      return "Are you trying to waste my time?";
    }
  }

  handleSetFocus(focused) {
    this.setState({ focused });
  }

  handleChange(value, questionPosed) {
    this.setState({
      value,
      eyePosition: value.length,
      magicWords: false,
      questionPosed: false
    });
  }

  render() {
    const {
      focused,
      questionPosed,
      unlocked,
      showFortune,
      fortune,
      eyePosition
    } = this.state;

    const containerClass =
      focused == "true" ? "container-focused" : "container";
    const magicWordClass = questionPosed == true ? "response" : "empty";
    const loadingClass = unlocked === true ? "loading" : "default";

    if (showFortune) {
      return <p className="fortune">{fortune}</p>;
    }

    return (
      <div className={loadingClass}>
        <div className={containerClass}>
          <Genie
            setEyes={eyePosition => this.setState({ eyePosition })}
            focused={focused}
            eyePosition={eyePosition}
            {...this.props}
          />
          <p className="instructions">
            Say the magic words to reveal your fortune
          </p>
          <div className="fortune-container">
            <FortuneInput
              poseQuestion={this.handlePoseQuestion}
              setFocus={this.handleSetFocus}
              handleChange={this.handleChange}
              {...this.props}
              {...this.state}
            />
            <p className="hint">Hint: {MAGIC_WORDS}</p>
          </div>
          <p className={magicWordClass}>{this.renderResponse()}</p>
        </div>
      </div>
    );
  }
}

export default Fortune;
