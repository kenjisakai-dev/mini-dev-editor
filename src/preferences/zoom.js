const { zoomApp } = require("../config/config");
const { store } = require("./store");

const setZoomApp = (zoomCurrent) => {
  try {
    store.set("preferences.zoomApp", zoomCurrent);
  } catch (err) {
    console.error(`Erro ao mudar zoom: ${err?.message}`);
  }
};

const zoomIn = () => parseFloat((zoomApp() + 0.1).toFixed(1));
const zoomOut = () => parseFloat((zoomApp() - 0.1).toFixed(1));

const permissionZoomIn = () => zoomIn() <= 2.0;
const permissionZoomOut = () => zoomOut() >= 1.0;

module.exports = {
  setZoomApp,
  zoomIn,
  zoomOut,
  permissionZoomIn,
  permissionZoomOut,
};
