const { ipcMain } = require("electron");
const { spawn } = require("child_process");
const { editorNameApp } = require("../config/config");
const { readCommands, appendCommand } = require("../config/historyCommands");

module.exports = (win) => {
  ipcMain.on("terminal-input", (event, input) => {
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
      win?.webContents.send("terminal-output", {
        finished: false,
        message: data.toString(),
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage++;
      event.returnValue = "OK";
    });

    shell.stderr.on("data", (data) => {
      win?.webContents.send("terminal-output", {
        finished: false,
        message: data.toString(),
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage++;
      event.returnValue = "OK";
    });

    shell.on("close", (code) => {
      win.webContents.send("terminal-output", {
        finished: true,
        message: `Processo finalizado: ${code}`,
        editorName: editorNameApp(),
        numericMessage,
      });

      numericMessage = 0;
    });
  });

  ipcMain.handle("get-history-commands", (event) => {
    const historyCommands = readCommands();
    return historyCommands;
  });

  ipcMain.on("append-history-command", (event, command) => {
    appendCommand(command);
  });
};
