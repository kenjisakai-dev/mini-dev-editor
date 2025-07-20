const { saveConfigApp } = require("./config");

const setColorTextApp = (win, colorSelected) => {
  try {
    win.webContents.send("set-color", `var(--${colorSelected})`);
    saveConfigApp({ colorTextApp: colorSelected });
  } catch (err) {
    console.error(`Erro ao mudar cor do texto: ${err?.message}`);
  }
};

module.exports = {
  setColorTextApp,
};
