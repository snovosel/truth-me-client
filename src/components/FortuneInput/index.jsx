import React, { Component } from "react";

import "./style.scss";

const MAX_CHARACTERS = 42;

class FortuneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      count: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.determineClassName = this.determineClassName.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.focused !== this.props.focused ||
      nextState.value !== this.state.value ||
      nextState.count !== this.state.count
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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

  handleChange(e) {
    const { setEyes } = this.props;
    const { value } = this.state;

    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.props.setEyes(this.state.value.length);

        if (this.state.value.split("").some(char => char === "?")) {
          // this.props.setQuestionPosed(true);
        } else {
          this.props.setQuestionPosed(false);
        }
      }
    );
  }

  render() {
    return (
      <input
        ref={ref => {
          this.input = ref;
        }}
        type="text"
        className={this.determineClassName()}
        onFocus={() => this.props.setFocus("true")}
        value={this.state.value}
        maxLength={MAX_CHARACTERS}
        onChange={this.handleChange}
        placeholder="...Ask away"
      />
    );
  }
}

export default FortuneInput;
