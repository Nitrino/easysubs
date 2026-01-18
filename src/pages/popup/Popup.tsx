async function getTab(): Promise<chrome.tabs.Tab | undefined> {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tabs[0];
}

const Popup = () => {
  const handleRequestPermissions = async () => {
    const tab = await getTab();
    if (!tab?.url) {
      console.warn("No active tab URL found");
      return;
    }
    const isGranted = await chrome.permissions.request({
      permissions: ["scripting", "storage", "activeTab"],
      origins: [tab.url],
    });
    if (isGranted && tab.id !== undefined) {
      chrome.tabs.reload(tab.id);
    }
  };

  const handleFaqLinkClick = () => {
    const faqUrl = "https://easysubs.cc/en/faq/";
    chrome.tabs.create({ url: faqUrl });
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
        <li onClick={handleRequestPermissions}>
          <a className="es-popup-kinopub">Enable on Kinopub</a>
        </li>
        <li onClick={handleFaqLinkClick}>
          <a>FAQ</a>
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
