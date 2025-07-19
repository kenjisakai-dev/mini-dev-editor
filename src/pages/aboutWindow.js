const path = require("path");
const { BrowserWindow, nativeImage } = require("electron");

const createAboutWindow = () => {
  const mainWindow = BrowserWindow.getFocusedWindow();

  if (mainWindow) {
    const appIcon = nativeImage.createFromPath(
      path.join(__dirname, "..", "public", "icons", "icon.png")
    );

    const win = new BrowserWindow({
      width: 320,
      height: 160,
      icon: appIcon,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: mainWindow,
      modal: true,
    });

    win.loadFile("src/views/sobre.html");
  }
};

module.exports = {
  createAboutWindow,
};
