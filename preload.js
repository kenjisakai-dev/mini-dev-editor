const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("preferences:setTheme", theme),
  setColor: (color) => ipcRenderer.on("preferences:setColor", color),
  setFont: (font) => ipcRenderer.on("preferences:setFont", font),
  setFile: (file) => ipcRenderer.on("file:setFile", file),
  updateContent: (content) => ipcRenderer.send("file:updateContent", content),
});
