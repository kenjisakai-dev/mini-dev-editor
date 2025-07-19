const { nativeTheme } = require("electron");
const { saveConfigApp } = require("./config");

const setThemeApp = (win, themeSelected) => {
  try {
    nativeTheme.themeSource = themeSelected;
    win.webContents.send("set-theme", themeSelected);
    saveConfigApp({ themeApp: themeSelected });
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeApp,
};
