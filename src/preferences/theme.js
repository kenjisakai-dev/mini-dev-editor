const { nativeTheme } = require("electron");
const { store } = require("./store");
const { EVENTS_PREFERENCES } = require("../shared/constants");
const { setColorTextApp } = require("./color");
const { colorTextApp } = require("../config/config");

const setThemeApp = (win, themeSelected) => {
  try {
    nativeTheme.themeSource = themeSelected;
    win.webContents.send(EVENTS_PREFERENCES.SET_THEME, themeSelected);
    store.set("preferences.themeApp", themeSelected);

    setColorTextApp(win, colorTextApp());
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeApp,
};
