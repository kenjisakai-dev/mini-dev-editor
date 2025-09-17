const Store = require("electron-store").default;
const { editorNameApp } = require("../config/config");

const store = new Store({
  defaults: {
    pwsh: { commands: [], lastCommand: "" },
    cmd: { commands: [], lastCommand: "" },
    powershell: { commands: [], lastCommand: "" },
  },
  name: "history-commands",
});

function appendCommand(command) {
  try {
    const editorName = editorNameApp().replace(".exe", "");

    const commands = store.get(`${editorName}.commands`, []);
    const lastCommand = store.get(`${editorName}.lastCommand`, "");

    if (command && command?.toLowerCase() !== lastCommand?.toLowerCase()) {
      store.set(`${editorName}.commands`, [...commands, command]);
      store.set(`${editorName}.lastCommand`, command);
    }
  } catch (err) {
    console.error(`Erro ao salvar comando no histórico: ${err?.message}`);
  }
}

function readCommands() {
  try {
    const editorName = editorNameApp().replace(".exe", "");
    return store.get(`${editorName}.commands`, []);
  } catch (err) {
    console.error(`Erro ao obter comandos do histórico: ${err?.message}`);
  }
}

module.exports = {
  appendCommand,
  readCommands,
};
