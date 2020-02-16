import React, { Component } from "react";

import "./style.scss";

const MAX_CHARACTERS = 42;

class FortuneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.determineClassName = this.determineClassName.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.updateDimensions = this.updateDimensions.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { setFocus } = this.props;
    if (this.state.height > prevState.height) {
      setFocus("false");
    } else if (this.state.height < prevState.height) {
      console.log("wayuur");
      setFocus("true");
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    console.log("here");
    this.setState({ height: window.innerHeight });
  }

  handleSubmit(e) {
    e.preventDefault();
    document.activeElement.blur();
    this.props.poseQuestion();
  }

  handleClickOutside(event) {
    const { setFocus } = this.props;

    if (this.input && !this.input.contains(event.target)) {
      this.props.setFocus("false", "ref");
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
    console.log("thisprops", this.props.mobile);
    this.props.setFocus("true");
  }

  handleChange({ target: { value } }) {
    const { handleChange } = this.props;

    handleChange(value, false);
  }

  render() {
    console.log("test");
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={ref => {
            this.input = ref;
          }}
          type="text"
          className={this.determineClassName()}
          onFocus={this.handleFocus}
          value={this.props.value}
          maxLength={MAX_CHARACTERS}
          onChange={this.handleChange}
          disabled={this.props.unlocked === true}
        />
      </form>
    );
  }
}

export default FortuneInput;
