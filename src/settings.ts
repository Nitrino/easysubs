import logo from './images/logo.svg'

class Settings {
  render(settingSelector: string) {
    const referenceNode = document.querySelector(settingSelector)
    const parentNode = document.querySelector(settingSelector).parentNode
    const settingNode = document.createElement("div");
    settingNode.className = "easysubs-settings"
    settingNode.innerHTML = `
      ${logo}
      <div class="easysubs-settings-content">

      </div>
    `
    parentNode.insertBefore(settingNode, referenceNode);
  }
}

export default Settings;
