import React, { Component } from "react";

import "./style.scss";

const MAX_CHARACTERS = 42;

const scrollToTop = () => {
  return window.setTimeout(() => window.scrollTo(0, 0), 0);
};

class FortuneInput extends Component {
  constructor(props) {
    super(props);

    // this.input = null;

    this.handleChange = this.handleChange.bind(this);

    this.determineClassName = this.determineClassName.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocusListener = this.handleFocusListener.bind(this);

    // this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("focus", this.handleFocusListener, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("focus", this.handleFocusListener, true);
  }

  handleSubmit(e) {
    e.preventDefault();
    document.activeElement.blur();
    this.props.poseQuestion();
  }

  determineClassName() {
    const { focused } = this.props;

    if (focused == "true") {
      return "focused";
    } else {
      return "input";
    }
  }

  handleFocus(e) {
    const { isMobile } = this.props;

    if (!isMobile) {
      this.props.setFocus("true");
    }

    if (isMobile) {
      this.props.setFocus("true");
    }
  }

  handleBlur() {
    this.props.setFocus("false");
  }

  preventDefault(e) {
    e.preventDefault();
  }

  handleChange({ target: { value } }) {
    const { handleChange } = this.props;

    handleChange(value, false);
  }

  render() {
    // return (
    //   <form onSubmit={this.handleSubmit}>
    //     <input
    //       ref={ref => {
    //         this.input = ref;
    //       }}
    //       onBlur={this.handleBlur}
    //       type="text"
    //       className={this.determineClassName()}
    //       onFocus={this.handleFocus}
    //       value={this.props.value}
    //       maxLength={MAX_CHARACTERS}
    //       onChange={this.handleChange}
    //       disabled={this.props.unlocked === true}
    //     />
    //   </form>
    // );

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={this.props.setRef}
          onBlur={this.handleBlur}
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

  handleFocusListener(event) {
    const { isMobile, setFocus, ref } = this.props;

    if (isMobile) {
      // event.preventDefault();
      // event.stopPropagation();
      // window.scrollTo(0, 0);
      // setTimeout(() => , 0);
      // this.input.current.scrollIntoView({ behavior: "smooth" });

      scrollToTop();
    }
  }
}

export default FortuneInput;
