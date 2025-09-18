const { store } = require("../preferences/store");

module.exports = {
  themeApp: () => store.get("preferences.themeApp", "system"),
  colorTextApp: () => store.get("preferences.colorTextApp", "cinzaClaro"),
  zoomApp: () => store.get("preferences.zoomApp", 1.2),
  zoomAppDefault: () => store.get("preferences.zoomAppDefault", 1.2),
  editorTerminal: () => store.get("preferences.editorTerminal", "pwsh.exe"),
};
