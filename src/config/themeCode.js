const { store } = require("./store");

const setThemeAppCode = (win, themeCodeSelected) => {
  try {
    win.webContents.send("set-theme-code", themeCodeSelected);
    store.set("preferences.themeAppCode", themeCodeSelected);
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeAppCode,
};
