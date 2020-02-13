import React from "react";

import "./index.scss";

const Response = ({ magicWords }) => (
  <p className="response">
    {magicWords === true
      ? "Bien dit mon gars"
      : "Are you trying to waste my time?"}
  </p>
);

export default Response;
