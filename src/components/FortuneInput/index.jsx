import React, { Component } from "react";

import "./style.scss";

const MAX_CHARACTERS = 42;

class FortuneInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.determineClassName = this.determineClassName.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusListener = this.handleFocusListener.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("focus", this.handleFocusListener, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("focus", this.handleFocusListener, true);
  }

  handleFocusListener() {
    const { isMobile, setFocus } = this.props;

    if (isMobile) {
      setFocus("true");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    document.activeElement.blur();
    this.props.poseQuestion();
  }

  handleClickOutside(event) {
    const { setFocus } = this.props;

    if (
      this.input &&
      !this.input.contains(event.target) &&
      this.props.focused == "true"
    ) {
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
    const { isMobile } = this.props;

    if (!isMobile) {
      this.props.setFocus("true");
    }
  }

  handleChange({ target: { value } }) {
    const { handleChange } = this.props;

    handleChange(value, false);
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
