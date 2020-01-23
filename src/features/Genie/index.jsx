import React, { Component } from "react";

import "./index.scss";

class Genie extends Component {
  render() {
    const { focused } = this.props;
    const pupilClass = focused == "true" ? "pupil-focused" : "pupil";
    const eyeClass = focused == "true" ? "eye-focused" : "eye";
    const eyeLidClass = focused == "true" ? "eye-lid-focused" : "eye-lid";

    const { eyePosition } = this.props;

    return (
      <div className="genie-container">
        <div className={"eye"}>
          <div className={eyeLidClass} />
          <div className={pupilClass} style={{ top: `${50 - eyePosition}%` }} />
        </div>
        <div className={"eye"}>
          <div className={eyeLidClass} />
          <div className={pupilClass} style={{ top: `${50 - eyePosition}%` }} />
        </div>
      </div>
    );
  }
}

export default Genie;
