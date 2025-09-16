const Store = require("electron-store").default;

let valuesDefault = {
  preferences: {
    themeApp: "system",
    themeAppCode: "material-darker",
    colorTextApp: "cinzaClaro",
    fontApp: "Source Code Pro",
    zoomApp: 1.2,
    zoomAppDefault: 1.2,
    editorTypeApp: "txt",
    editorNameApp: "text",
  },
};

const store = new Store({
  defaults: valuesDefault,
  name: "preferences",
});

module.exports = {
  store,
};
