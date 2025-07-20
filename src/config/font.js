const { saveConfigApp } = require("./config");

const setFontApp = (win, fontSelected) => {
  try {
    win.webContents.send("set-font", fontSelected);
    saveConfigApp({ fontApp: fontSelected });
  } catch (err) {
    console.error(`Erro ao mudar fonte: ${err?.message}`);
  }
};

module.exports = {
  setFontApp,
};
