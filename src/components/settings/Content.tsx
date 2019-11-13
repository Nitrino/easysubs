import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";
import logo from "../images/logo.svg";

function Content(props: any) {
  console.log(props);

  return (
    <div
      className="easysubs-settings-content"
      style={{ display: props.display }}
    >
      <Toggle />
    </div>
  );
}

export default Content;
