import React from "react";
import "@pages/options/Options.scss";

import { FAQ } from "./FAQ";
import { Logo } from "./assets/Logo";

const Options: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <Logo />
      </div>
      <div className="content">
        <FAQ />
      </div>
    </div>
  );
};

export default Options;
