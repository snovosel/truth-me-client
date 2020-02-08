import React, { Component } from "react";

import "./style.scss";

const MAX_CHARACTERS = 42;

class FortuneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      count: 0,
      height: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.determineClassName = this.determineClassName.bind(this);

    this.handleFocus = this.handleFocus.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextProps.focused !== this.props.focused ||
  //     nextState.value !== this.state.value ||
  //     nextState.count !== this.state.count
  //   ) {
  //     return true;
  //   }
  //
  //   return false;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.height > prevState.height) {
  //     this.props.setFocus("false");
  //   }
  //
  //   if (this.state.height < prevState.height) {
  //     this.props.setFocus("true");
  //   }
  // }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ height: window.innerHeight });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.poseQuestion(this.state.value);
  }

  handleClickOutside(event) {
    const { setFocus } = this.props;

    if (this.input && !this.input.contains(event.target)) {
      setFocus("false");
    }
  }

  determineClassName() {
    const { focused } = this.props;

    if (focused == "true") {
      return "focused";
    } else {
      return "input";
    }
  }

  handleFocus() {
    this.props.setFocus("true");
    // document.body.scrollTop = this.ref.offset
  }

  handleChange(e) {
    const { setEyes } = this.props;
    const { value } = this.state;

    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.props.setEyes(this.state.value.length);

        this.props.resetQuestion();

        this.props.setQuestionPosed(false);

        // if (this.state.value.split("").some(char => char === "?")) {
        //   this.props.setQuestionPosed(true);
        // } else {
        //   this.props.setQuestionPosed(false);
        // }
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={ref => {
            this.input = ref;
          }}
          type="text"
          className={this.determineClassName()}
          onFocus={this.handleFocus}
          onBlur={() => this.props.setFocus("false")}
          value={this.state.value}
          maxLength={MAX_CHARACTERS}
          onChange={this.handleChange}
          disabled={this.props.unlocked === true}
        />
      </form>
    );
  }
}

export default FortuneInput;
