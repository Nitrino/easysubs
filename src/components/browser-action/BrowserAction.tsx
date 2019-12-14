import React from "react";

function BrowserAction() {
  function handleClick() {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  }

  return (
    <div className="content">
      <div className="header">EasySubs</div>
      <menu>
        <li>
          <a target="_blank" href="http://nitrino.io/easysubs/">
            Home page
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            Report bugs
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            Suggest features
          </a>
        </li>
        <li>
          <div onClick={handleClick}>Open local video player</div>
        </li>
      </menu>
    </div>
  );
}

export default BrowserAction;
