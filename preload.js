const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("set-theme", theme),
  setColor: (color) => ipcRenderer.on("set-color", color),
  setFont: (font) => ipcRenderer.on("set-font", font),
  setFile: (file) => ipcRenderer.on("set-file", file),
  updateContent: (content) => ipcRenderer.send("update-content", content),
  setEditorType: (editorType) => ipcRenderer.on("set-editor-type", editorType),

  terminalInput: (input) => ipcRenderer.send("terminal-input", input),
  terminalOutput: (outputObject) =>
    ipcRenderer.on("terminal-output", outputObject),
});
