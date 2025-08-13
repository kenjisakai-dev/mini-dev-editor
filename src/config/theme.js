const { nativeTheme } = require("electron");
const { saveConfigApp, colorTextApp } = require("./config");

const setThemeApp = (win, themeSelected) => {
  try {
    nativeTheme.themeSource = themeSelected;
    win.webContents.send("set-theme", themeSelected);
    win.webContents.send("set-color", colorTextApp());
    saveConfigApp({ themeApp: themeSelected });
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeApp,
};
