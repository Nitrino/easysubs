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
        permissions: ["webNavigation", "scripting", "tabs", "storage", "tts", "contextMenus", "activeTab"],
        origins: [host],
      },
      (granted) => {
        console.log("GRANTEEEEED", granted);
      }
    );
  };

  return (
    <div className="content">
      <div className="header">Easysubs</div>
      <menu>
        <li>
          <a target="_blank" href="https://easysubs.co" rel="noreferrer">
            Home
          </a>
        </li>
        <li>
          <a className="es-popup-kinopub" onClick={handleRequestPermissions}>
            Enable on Kinopub
          </a>
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
