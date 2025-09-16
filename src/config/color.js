const { store } = require("./store");

const setColorTextApp = (win, colorSelected) => {
  try {
    win.webContents.send("set-color", colorSelected);
    store.set("preferences.colorTextApp", colorSelected);
  } catch (err) {
    console.error(`Erro ao mudar cor do texto: ${err?.message}`);
  }
};

module.exports = {
  setColorTextApp,
};
