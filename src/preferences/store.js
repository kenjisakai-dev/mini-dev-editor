const Store = require("electron-store").default;

let valuesDefault = {
  preferences: {
    themeApp: "system",
    colorTextApp: "cinzaClaro",
    zoomApp: 1.2,
    zoomAppDefault: 1.2,
    editorTerminal: "pwsh.exe",
  },
};

const store = new Store({
  defaults: valuesDefault,
  name: "preferences-editor-terminal",
});

module.exports = {
  store,
};
