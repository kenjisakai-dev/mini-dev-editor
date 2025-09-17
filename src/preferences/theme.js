const { nativeTheme } = require("electron");
const { colorTextApp } = require("../config/config");
const { store } = require("./store");

const setThemeApp = (win, themeSelected) => {
  try {
    nativeTheme.themeSource = themeSelected;
    win.webContents.send("set-theme", themeSelected);
    win.webContents.send("set-color", colorTextApp());
    store.set("preferences.themeApp", themeSelected);
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeApp,
};
