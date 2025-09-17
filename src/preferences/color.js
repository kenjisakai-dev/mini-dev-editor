const { EVENTS_PREFERENCES } = require("../shared/constants");
const { store } = require("./store");

const setColorTextApp = (win, colorSelected) => {
  try {
    win.webContents.send(EVENTS_PREFERENCES.SET_COLOR, colorSelected);
    store.set("preferences.colorTextApp", colorSelected);
  } catch (err) {
    console.error(`Erro ao mudar cor do texto: ${err?.message}`);
  }
};

module.exports = {
  setColorTextApp,
};
