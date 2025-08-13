const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const pathUserData = app.getPath("userData");
const filename = "mini-dev-editor-config.json";
const fileConfig = path.join(pathUserData, filename);

function configDefaultApp() {
  return {
    themeApp: "system",
    colorTextApp: "cinzaClaro",
    fontApp: "Source Code Pro",
    zoomApp: 1.2,
    editorTypeApp: "text",
  };
}

function getConfigApp() {
  let data = configDefaultApp();

  if (fs.existsSync(fileConfig)) {
    const readFile = fs.readFileSync(fileConfig, { encoding: "utf-8" });
    const { themeApp, colorTextApp, fontApp, zoomApp, editorTypeApp } =
      JSON.parse(readFile);

    data = {
      themeApp: themeApp || data.themeApp,
      colorTextApp: colorTextApp || data.colorTextApp,
      fontApp: fontApp || data.fontApp,
      zoomApp: zoomApp || data.zoomApp,
      editorTypeApp: editorTypeApp || data.editorTypeApp,
    };
  }

  return data;
}

function saveConfigApp({
  themeApp,
  colorTextApp,
  fontApp,
  zoomApp,
  editorTypeApp,
}) {
  const currentConfig = getConfigApp();

  const data = {
    themeApp: themeApp || currentConfig.themeApp,
    colorTextApp: colorTextApp || currentConfig.colorTextApp,
    fontApp: fontApp || currentConfig.fontApp,
    zoomApp: zoomApp || currentConfig.zoomApp,
    editorTypeApp: editorTypeApp || currentConfig.editorTypeApp,
  };

  fs.writeFileSync(fileConfig, JSON.stringify(data), { encoding: "utf-8" });
}

module.exports = {
  saveConfigApp,
  themeApp: () => getConfigApp().themeApp,
  colorTextApp: () => getConfigApp().colorTextApp,
  fontApp: () => getConfigApp().fontApp,
  zoomApp: () => getConfigApp().zoomApp,
  editorTypeApp: () => getConfigApp().editorTypeApp,
  themeAppDefault: () => configDefaultApp().themeApp,
  colorTextAppDefault: () => configDefaultApp().colorTextApp,
  fontAppDefault: () => configDefaultApp().fontApp,
  zoomAppDefault: () => configDefaultApp().zoomApp,
  editorTypeAppDefault: () => configDefaultApp().editorTypeApp,
};
