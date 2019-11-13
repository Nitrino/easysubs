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
        <label class="easysubs-label">
          <div class="toggle">
            <input class="toggle-state setting-toggle" type="checkbox" name="check" value="check" ${window.isEnable ? "checked" : ""}/>
            <div class="toggle-inner">
              <div class="indicator"></div>
            </div>
            <div class="active-bg"></div>
          </div>
          <div class="easysubs-label-text">${window.isEnable ? "On" : "Off"}</div>
        </label>
      </div>
    `
    parentNode.insertBefore(settingNode, referenceNode);

    const settingToggleInput = document.querySelector("setting-toggle")
  }
}

export default Settings;
