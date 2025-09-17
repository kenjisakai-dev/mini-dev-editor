const Store = require("electron-store").default;

let valuesDefault = {
  preferences: {
    themeApp: "system",
    colorTextApp: "cinzaClaro",
    fontApp: "Source Code Pro",
    zoomApp: 1.2,
    zoomAppDefault: 1.2,
  },
};

const store = new Store({
  defaults: valuesDefault,
  name: "preferences-editor-txt",
});

module.exports = {
  store,
};
