const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { editorNameApp } = require("./config");

function appendCommand(command) {
  try {
    const pathUserData = app.getPath("userData");
    const filename = `history-commands-${editorNameApp().replace(
      ".exe",
      ""
    )}.txt`;
    const fileHistoryCommands = path.join(pathUserData, filename);

    let lastCommand = null;

    if (fs.existsSync(fileHistoryCommands)) {
      const lines = fs
        .readFileSync(fileHistoryCommands, "utf-8")
        .trim()
        .split("\n");

      lastCommand =
        lines.length > 0 ? JSON.parse(lines[lines.length - 1]) : null;
    }

    if (command && command !== lastCommand) {
      fs.appendFileSync(
        fileHistoryCommands,
        `${JSON.stringify(command)}\n`,
        "utf-8"
      );
    }
  } catch (err) {
    console.error(`Erro ao salvar comando no histórico: ${err?.message}`);
  }
}

function readCommands() {
  try {
    const pathUserData = app.getPath("userData");
    const filename = `history-commands-${editorNameApp().replace(
      ".exe",
      ""
    )}.txt`;
    const fileHistoryCommands = path.join(pathUserData, filename);

    let commands = [];

    if (fs.existsSync(fileHistoryCommands)) {
      const lines = fs
        .readFileSync(fileHistoryCommands, "utf-8")
        .trim()
        .split("\n");
      commands = lines.map((line) => JSON.parse(line));
    }

    return commands;
  } catch (err) {
    console.error(`Erro ao obter comandos do histórico: ${err?.message}`);
  }
}

module.exports = {
  appendCommand,
  readCommands,
};
