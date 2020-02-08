import React, { Component, Fragment } from "react";

import Genie from "../Genie";

import FortuneInput from "../../components/FortuneInput";

import "./index.scss";

const lamp = require("../../unnamedopaque.png");

const MAGIC_WORDS = "le pain perdu est perdu";

class Fortune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fortune: null,
      question: "",
      showFortune: false,
      questionPosed: false,
      focused: false,
      eyePosition: null,
      magicWords: false,
      unlocked: false
    };

    this.handlePoseQuestion = this.handlePoseQuestion.bind(this);
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

      // fetch("http://localhost:8080/fortune/" + fortuneId)
      //   .then(response => response.json())
      //   .then(data => {
      //     this.setState({
      //       fortune: data.fortune
      //     });
      //   });
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

  handlePoseQuestion(question) {
    if (question === MAGIC_WORDS) {
      this.setState({
        magicWords: this.state.fortune ? true : false,
        focused: false,
        questionPosed: true,
        unlocked: this.state.fortune ? true : false
      });
    }

    if (question !== MAGIC_WORDS) {
      this.setState({
        magicWords: false,
        focused: false,
        questionPosed: true
      });
    }

    if (question === "" || question === null || question === false) {
      this.setState({
        focused: false
      });
    }
  }

  renderResponse() {
    if (this.state.magicWords === true) {
      return "Bien dit mon gars";
    }

    if (this.state.magicWords === false) {
      return "Are you trying to waste my time?";
    }
  }

  render() {
    const focusedClass = this.props.focused == "true" ? "#2c2122" : "#1a1a1a";
    const containerClass =
      this.props.focused == "true" ? "container-focused" : "container";

    const magicWordClass =
      this.state.questionPosed == true ? "response" : "empty";

    const loadingClass = this.state.unlocked === true ? "loading" : "default";

    console.log("this.props", this.props);

    const focusedHeight = {
      color: "white",
      position: "absolute",
      top: "25%",
      left: "0%",
      zIndex: 999
    };

    console.log("this.props.focused", this.props.focused);

    return (
      <Fragment>
        {this.state.showFortune ? (
          <p className="fortune">{this.state.fortune}</p>
        ) : (
          <p className="hidden" />
        )}
        <div className={loadingClass}>
          <div className={containerClass}>
            <p style={focusedHeight}>
              {this.props.focused == "true" ? "true" : "false"}
            </p>
            <Genie
              setEyes={eyePosition => this.setState({ eyePosition })}
              focused={this.props.focused}
              eyePosition={this.state.eyePosition}
              {...this.props}
            />
            <p className="instructions">
              Say the magic words to reveal your fortune
            </p>
            <div className="fortune-container">
              <FortuneInput
                poseQuestion={this.handlePoseQuestion}
                setEyes={eyePosition => this.setState({ eyePosition })}
                resetQuestion={() => this.setState({ magicWords: false })}
                setQuestionPosed={posed =>
                  this.setState({ questionPosed: posed })
                }
                {...this.props}
                {...this.state}
              />
              <p className="hint">Hint: le pain perdu est perdu</p>
            </div>

            <p className={magicWordClass}>{this.renderResponse()}</p>
          </div>
        </div>
      </Fragment>
    );

    if (this.state.fortune && this.state.showFortune) {
      return <p className="fortune">{this.state.fortune}</p>;
    } else {
    }
  }
}

export default Fortune;
