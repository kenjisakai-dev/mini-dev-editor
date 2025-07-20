const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("set-theme", theme),
  setColor: (color) => ipcRenderer.on("set-color", color),
  setFont: (font) => ipcRenderer.on("set-font", font),
  setFile: (file) => ipcRenderer.on("set-file", file),
  updateContent: (content) => ipcRenderer.send("update-content", content),
});
