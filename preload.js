const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("preferences:setTheme", theme),
  setColor: (color) => ipcRenderer.on("preferences:setColor", color),
  setTerminal: (terminal) =>
    ipcRenderer.on("preferences:setTerminal", terminal),

  terminalInput: (input) => ipcRenderer.send("terminal:input", input),
  terminalOutput: (outputObject) =>
    ipcRenderer.on("terminal:output", outputObject),

  getHistoryCommands: () => ipcRenderer.invoke("terminal:getHistoryCommand"),
  appendHistoryCommand: (command) =>
    ipcRenderer.send("terminal:appendHistoryCommand", command),
});
