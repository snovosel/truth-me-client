import React, { Component } from "react";

import "./index.scss";

class Genie extends Component {
  render() {
    const { focused, questionPosed, eyePosition } = this.props;

    let pupilClass = focused == "true" ? "pupil-focused" : "pupil";
    const eyeClass = focused == "true" ? "eye-focused" : "eye";
    let eyeLidClassTop = "top";
    let eyePostitionVal = eyePosition;
    let eyeLidClassBottom = "bottom";

    if (questionPosed === true) {
      pupilClass = "pupil-focused";
      eyeLidClassTop = "open-top";
      eyePostitionVal = 10;
      eyeLidClassBottom = "open-bottom";
    }

    const eyeLidColor = {
      backgroundColor: focused == "true" ? "#2c2122" : "#1a1a1a"
    };

    return (
      <div className="genie-container">
        <div className={"eye"}>
          <div className={eyeLidClassTop} style={eyeLidColor} />
          <div
            className={pupilClass}
            style={{ top: `${50 - eyePostitionVal}%` }}
          />
          <div className={eyeLidClassBottom} style={eyeLidColor} />
        </div>
        <div className={"eye"}>
          <div className={`${eyeLidClassTop}-second`} style={eyeLidColor} />
          <div
            className={pupilClass}
            style={{ top: `${50 - eyePostitionVal}%` }}
          />
          <div className={`${eyeLidClassBottom}-second`} style={eyeLidColor} />
        </div>
      </div>
    );
  }
}

export default Genie;
