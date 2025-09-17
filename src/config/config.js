const { store } = require("../preferences/store");

module.exports = {
  themeApp: () => store.get("preferences.themeApp", "system"),
  themeAppCode: () => store.get("preferences.themeAppCode", "material-darker"),
  colorTextApp: () => store.get("preferences.colorTextApp", "cinzaClaro"),
  fontApp: () => store.get("preferences.fontApp", "Source Code Pro"),
  zoomApp: () => store.get("preferences.zoomApp", 1.2),
  zoomAppDefault: () => store.get("preferences.zoomAppDefault", 1.2),
  editorTypeApp: () => store.get("preferences.editorTypeApp", "txt"),
  editorNameApp: () => store.get("preferences.editorNameApp", "text"),
};
