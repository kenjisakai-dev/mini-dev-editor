const { store } = require("../preferences/store");

module.exports = {
  zoomApp: () => store.get("preferences.zoomApp", 1.2),
  zoomAppDefault: () => store.get("preferences.zoomAppDefault", 1.2),
  editorLanguage: () => store.get("preferences.editorLanguage", "javascript"),
  themeApp: () => store.get("preferences.themeApp", "material-darker"),
};
