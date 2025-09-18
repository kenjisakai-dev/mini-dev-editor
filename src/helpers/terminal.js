const { ipcMain } = require("electron");
const { spawn } = require("child_process");
const { editorNameApp } = require("../config/config");
const { readCommands, appendCommand } = require("../helpers/historyCommands");
const { EVENTS_TERMINAL } = require("../shared/constants");

module.exports = (win) => {
  ipcMain.on(EVENTS_TERMINAL.TERMINAL_INPUT, (event, input) => {
    let numericMessage = 0;
    let shellArgs = [];
    const shellName = editorNameApp();

    if (shellName === "cmd.exe") {
      shellArgs = ["/c", input];
    } else {
      shellArgs = [
        "-NoLogo",
        "-NoProfile",
        "-Command",
        `[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8; ${input}`,
      ];
    }

    const shell = spawn(shellName, shellArgs, { encoding: "utf8" });

    shell.stdout.on("data", (data) => {
      win?.webContents.send(EVENTS_TERMINAL.TERMINAL_OUTPUT, {
        finished: false,
        message: data.toString(),
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage++;
      event.returnValue = "OK";
    });

    shell.stderr.on("data", (data) => {
      win?.webContents.send(EVENTS_TERMINAL.TERMINAL_OUTPUT, {
        finished: false,
        message: data.toString(),
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage++;
      event.returnValue = "OK";
    });

    shell.on("close", (code) => {
      win.webContents.send(EVENTS_TERMINAL.TERMINAL_OUTPUT, {
        finished: true,
        message: `Processo finalizado: ${code}`,
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage = 0;
    });
  });

  ipcMain.handle(EVENTS_TERMINAL.GET_HISTORY_COMMANDS, (event) => {
    const historyCommands = readCommands();
    return historyCommands;
  });

  ipcMain.on(EVENTS_TERMINAL.APPEND_HISTORY_COMMAND, (event, command) => {
    appendCommand(command);
  });
};
