const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const pathUserData = app.getPath("userData");
const filename = "mini-dev-editor-config.json";
const fileConfig = path.join(pathUserData, filename);

let configCache = {
  themeApp: "system",
  themeAppCode: "material-darker",
  colorTextApp: "cinzaClaro",
  fontApp: "Source Code Pro",
  zoomApp: 1.2,
  editorTypeApp: "txt",
  editorNameApp: "text",
};

async function loadConfigApp() {
  if (fs.existsSync(fileConfig)) {
    const readFile = fs.readFileSync(fileConfig, { encoding: "utf-8" });
    configCache = JSON.parse(readFile);
  }

  return configCache;
}

function saveConfigApp({
  themeApp,
  themeAppCode,
  colorTextApp,
  fontApp,
  zoomApp,
  editorTypeApp,
  editorNameApp,
}) {
  configCache = {
    themeApp: themeApp || configCache.themeApp,
    themeAppCode: themeAppCode || configCache.themeAppCode,
    colorTextApp: colorTextApp || configCache.colorTextApp,
    fontApp: fontApp || configCache.fontApp,
    zoomApp: zoomApp || configCache.zoomApp,
    editorTypeApp: editorTypeApp || configCache.editorTypeApp,
    editorNameApp: editorNameApp || configCache.editorNameApp,
  };

  fs.writeFileSync(fileConfig, JSON.stringify(configCache), {
    encoding: "utf-8",
  });
}

module.exports = {
  loadConfigApp,
  saveConfigApp,

  themeApp: () => configCache.themeApp,
  themeAppCode: () => configCache.themeAppCode,
  colorTextApp: () => configCache.colorTextApp,
  fontApp: () => configCache.fontApp,
  zoomApp: () => configCache.zoomApp,
  zoomAppDefault: () => 1.2,
  editorTypeApp: () => configCache.editorTypeApp,
  editorNameApp: () => configCache.editorNameApp,
};
