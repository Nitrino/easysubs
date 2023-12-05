function castTarget(target) {
  return typeof target === "object"
    ? target
    : {
        tabId: target,
        frameId: 0,
      };
}

async function getTabUrl() {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tabs[0].url;
}

const Popup = () => {
  const handleRequestPermissions = async () => {
    const host = await getTabUrl();
    chrome.permissions.request(
      {
        permissions: ["scripting", "tabs", "storage", "tts", "contextMenus", "activeTab"],
        origins: [host],
      },
      (granted) => {
        console.log("GRANTEEEEED", granted);
      }
    );
  };

  const handleFaqLinkClick = () => {
    chrome.runtime.onInstalled.addListener(function (object) {
      let optionsUrl = chrome.runtime.getURL("src/pages/options/index.html");

      if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: optionsUrl }, function (tab) {
          console.log("New tab launched with options page");
        });
      }
    });
  };

  return (
    <div className="content">
      <div className="header">Easysubs</div>
      <menu>
        <li>
          <a target="_blank" href="https://easysubs.cc" rel="noreferrer">
            Home
          </a>
        </li>
        <li>
          <a className="es-popup-kinopub" onClick={handleRequestPermissions}>
            Enable on Kinopub
          </a>
        </li>
        <li>
          <a onClick={handleFaqLinkClick}>FAQ</a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs" rel="noreferrer">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues" rel="noreferrer">
            Report bugs
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues" rel="noreferrer">
            Suggest features
          </a>
        </li>
        <li>
          <a target="_blank" href="https://t.me/easysubs_ext" rel="noreferrer">
            Support chat
          </a>
        </li>
      </menu>
    </div>
  );
};

export default Popup;
