const { store } = require("./store");

const setTerminal = async (win, editorTerminal) => {
  try {
    win.webContents.send("setTerminal", editorTerminal);
    store.set("preferences.editorTerminal", editorTerminal);
  } catch (err) {
    console.error(`Erro ao mudar terminal: ${err?.message}`);
  }
};

module.exports = {
  setTerminal,
};
