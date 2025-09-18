const { EVENTS_CODE } = require("../shared/constants");
const { store } = require("./store");

const setEditorLanguage = async (win, editorLanguage) => {
  try {
    win.webContents.send(EVENTS_CODE.SET_EDITOR_LANGUAGE, editorLanguage);
    store.set("preferences.editorLanguage", editorLanguage);
  } catch (err) {
    console.error(`Erro ao mudar editor: ${err?.message}`);
  }
};

module.exports = {
  setEditorLanguage,
};
