const { EVENTS_PREFERENCES } = require("../shared/constants");
const { store } = require("./store");

const setThemeAppCode = (win, themeCodeSelected) => {
  try {
    win.webContents.send(EVENTS_PREFERENCES.SET_THEME_CODE, themeCodeSelected);
    store.set("preferences.themeAppCode", themeCodeSelected);
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeAppCode,
};
