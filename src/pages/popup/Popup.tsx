function castTarget(target) {
  return typeof target === "object"
    ? target
    : {
        tabId: target,
        frameId: 0,
      };
}

async function getTab() {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tabs[0];
}

const Popup = () => {
  const handleRequestPermissions = async () => {
    const tab = await getTab();
    const isGranted = await chrome.permissions.request({
      permissions: ["scripting", "storage", "activeTab"],
      origins: [tab.url],
    });
    if (!isGranted) return;

    // Inject into the current tab without reloading, so SPA players
    // (e.g. Jellyfin) don't lose their playback state. Future page loads
    // are handled automatically by webext-dynamic-content-scripts.
    const [contentScript] = chrome.runtime.getManifest().content_scripts ?? [];
    try {
      if (contentScript?.css?.length) {
        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: contentScript.css,
        });
      }
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: contentScript.js,
      });
      window.close();
    } catch (e) {
      // Fallback: reload if programmatic injection fails
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
          <a className="es-popup-kinopub">Enable on this site</a>
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
