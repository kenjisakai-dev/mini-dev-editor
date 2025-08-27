const { saveConfigApp } = require("./config");

const setThemeAppCode = (win, themeCodeSelected) => {
  try {
    win.webContents.send("set-theme-code", themeCodeSelected);
    saveConfigApp({ themeAppCode: themeCodeSelected });
  } catch (err) {
    console.error(`Erro ao mudar tema: ${err?.message}`);
  }
};

module.exports = {
  setThemeAppCode,
};
