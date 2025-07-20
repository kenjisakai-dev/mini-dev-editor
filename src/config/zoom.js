const { saveConfigApp } = require("./config");

const setZoomApp = (zoomCurrent) => {
  try {
    saveConfigApp({ zoomApp: zoomCurrent });
  } catch (err) {
    console.error(`Erro ao mudar zoom: ${err?.message}`);
  }
};

module.exports = {
  setZoomApp,
};
