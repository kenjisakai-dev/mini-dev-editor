const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("preferences:setTheme", theme),
  setThemeCode: (theme) => ipcRenderer.on("preferences:setThemeCode", theme),
  setColor: (color) => ipcRenderer.on("preferences:setColor", color),
  setFont: (font) => ipcRenderer.on("preferences:setFont", font),
  setEditorType: (editor) =>
    ipcRenderer.on("preferences:setEditorType", editor),

  setFile: (file) => ipcRenderer.on("file:setFile", file),
  updateContent: (content) => ipcRenderer.send("file:updateContent", content),

  terminalInput: (input) => ipcRenderer.send("terminal:input", input),
  terminalOutput: (outputObject) =>
    ipcRenderer.on("terminal:output", outputObject),
  getHistoryCommands: () => ipcRenderer.invoke("terminal:getHistoryCommands"),
  appendHistoryCommand: (command) =>
    ipcRenderer.send("terminal:appendHistoryCommand", command),
});
