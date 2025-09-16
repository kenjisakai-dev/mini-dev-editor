const { store } = require("./store");

module.exports = {
  themeApp: () => store.get("preferences.themeApp"),
  themeAppCode: () => store.get("preferences.themeAppCode"),
  colorTextApp: () => store.get("preferences.colorTextApp"),
  fontApp: () => store.get("preferences.fontApp"),
  zoomApp: () => store.get("preferences.zoomApp"),
  zoomAppDefault: () => store.get("preferences.zoomAppDefault"),
  editorTypeApp: () => store.get("preferences.editorTypeApp"),
  editorNameApp: () => store.get("preferences.editorNameApp"),
};
