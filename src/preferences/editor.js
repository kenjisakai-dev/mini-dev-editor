const { EVENTS_PREFERENCES } = require("../shared/constants");
const { store } = require("./store");

const setEditorType = async (win, editorType, editorName) => {
  try {
    win.webContents.send(EVENTS_PREFERENCES.SET_EDITOR_TYPE, {
      editorType,
      editorName,
    });
    store.set("preferences.editorTypeApp", editorType);
    store.set("preferences.editorNameApp", editorName);
  } catch (err) {
    console.error(`Erro ao mudar editor: ${err?.message}`);
  }
};

module.exports = {
  setEditorType,
};
