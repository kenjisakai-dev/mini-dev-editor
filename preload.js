const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  setTheme: (theme) => ipcRenderer.on("preferences:setTheme", theme),
  setFile: (file) => ipcRenderer.on("file:setFile", file),
  updateContent: (content) => ipcRenderer.send("file:updateContent", content),
  setEditorLanguage: (language) =>
    ipcRenderer.on("code:setEditorLanguage", language),
});
