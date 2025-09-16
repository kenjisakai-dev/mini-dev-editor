const { store } = require("./store");

const setZoomApp = (zoomCurrent) => {
  try {
    store.set("preferences.zoomApp", zoomCurrent);
  } catch (err) {
    console.error(`Erro ao mudar zoom: ${err?.message}`);
  }
};

module.exports = {
  setZoomApp,
};
