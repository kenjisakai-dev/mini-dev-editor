const { zoomApp } = require("../config/config");
const { store } = require("./store");

const setZoomApp = (win, zoom) => {
  try {
    store.set("preferences.zoomApp", zoom);
    win.webContents.setZoomFactor(zoom);
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
