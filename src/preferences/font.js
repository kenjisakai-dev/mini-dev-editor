const { EVENTS_PREFERENCES } = require("../shared/constants");
const { store } = require("./store");

const setFontApp = (win, fontSelected) => {
  try {
    win.webContents.send(EVENTS_PREFERENCES.SET_FONT, fontSelected);
    store.set("preferences.fontApp", fontSelected);
  } catch (err) {
    console.error(`Erro ao mudar fonte: ${err?.message}`);
  }
};

module.exports = {
  setFontApp,
};
