const { store } = require("./store");
const { EVENTS_PREFERENCES } = require("../shared/constants");

const setThemeApp = (win, themeSelected) => {
  try {
    win.webContents.send(EVENTS_PREFERENCES.SET_THEME, themeSelected);
    store.set("preferences.themeApp", themeSelected);
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeApp,
};
