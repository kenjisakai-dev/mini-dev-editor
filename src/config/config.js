const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const pathUserData = app.getPath("userData");
const filename = "mini-dev-editor-config.json";
const fileConfig = path.join(pathUserData, filename);

function getConfigApp() {
  if (fs.existsSync(fileConfig)) {
    const readFile = fs.readFileSync(fileConfig, { encoding: "utf-8" });
    const { themeApp, colorTextApp } = JSON.parse(readFile);
    return { themeApp, colorTextApp };
  }

  return { themeApp: "system", colorTextApp: "cinzaClaro" };
}

function saveConfigApp({ themeApp, colorTextApp }) {
  const currentConfig = getConfigApp();

  const data = {
    themeApp: themeApp || currentConfig.themeApp,
    colorTextApp: colorTextApp || currentConfig.colorTextApp,
  };

  fs.writeFileSync(fileConfig, JSON.stringify(data), { encoding: "utf-8" });
}

module.exports = {
  saveConfigApp,
  themeApp: () => getConfigApp().themeApp,
  colorTextApp: () => getConfigApp().colorTextApp,
};
