const Store = require("electron-store").default;

let valuesDefault = {
  preferences: {
    themeApp: "material-darker",
    zoomApp: 1.2,
    zoomAppDefault: 1.2,
    editorLanguage: "javascript",
  },
};

const store = new Store({
  defaults: valuesDefault,
  name: "preferences-editor-code",
});

module.exports = {
  store,
};
