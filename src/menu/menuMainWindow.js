const path = require("path");
const { Menu, nativeTheme, MenuItem } = require("electron");
const {
  themeApp,
  colorTextApp,
  zoomApp,
  zoomAppDefault,
  editorTerminal,
} = require("../config/config");
const { setThemeApp } = require("../preferences/theme");
const { setColorTextApp } = require("../preferences/color");
const { createAboutWindow } = require("../pages/aboutWindow");
const { setZoomApp } = require("../preferences/zoom");
const { setTerminal } = require("../preferences/editor");

const buildTemplateMenu = (win) => {
  const getIcon = (iconName) => {
    return path.join(__dirname, "..", "public", "icons", `${iconName}.png`);
  };

  const getIconTheme = (iconName) => {
    const isDark = nativeTheme.shouldUseDarkColors;
    const themeIcon = isDark ? `${iconName}-dark.png` : `${iconName}-light.png`;
    return path.join(__dirname, "..", "public", "icons", themeIcon);
  };

  const templateMenu = Menu.buildFromTemplate([]);

  const menuTerminal = new MenuItem({
    label: "Terminal",
    submenu: [
      {
        label: "Powershell 5",
        type: "checkbox",
        checked: editorTerminal() === "powershell.exe",
        enabled: editorTerminal() === "powershell.exe" ? false : true,
        click: async () => {
          await setTerminal(win, "powershell.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "Powershell 7",
        type: "checkbox",
        checked: editorTerminal() === "pwsh.exe",
        enabled: editorTerminal() === "pwsh.exe" ? false : true,
        click: async () => {
          await setTerminal(win, "pwsh.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "CMD",
        type: "checkbox",
        checked: editorTerminal() === "cmd.exe",
        enabled: editorTerminal() === "cmd.exe" ? false : true,
        click: async () => {
          await setTerminal(win, "cmd.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
    ],
  });
  const menuZoom = new MenuItem({
    label: "Zoom",
    submenu: [
      {
        label: "Aplicar zoom",
        accelerator: "CmdOrCtrl+=",
        click: () => {
          const zoom = parseFloat((zoomApp() + 0.1).toFixed(1));
          if (zoom <= 2) {
            win.webContents.setZoomFactor(zoom);
            setZoomApp(zoom);
          }
        },
        icon: getIconTheme("zoom-in"),
      },
      {
        label: "Reduzir zoom",
        accelerator: "CmdOrCtrl+-",
        click: () => {
          const zoom = parseFloat((zoomApp() - 0.1).toFixed(1));
          if (zoom >= 1) {
            win.webContents.setZoomFactor(zoom);
            setZoomApp(zoom);
          }
        },
        icon: getIconTheme("zoom-out"),
      },
      {
        type: "separator",
      },
      {
        label: "Restaurar zoom",
        accelerator: "CmdOrCtrl+0",
        click: () => {
          win.webContents.setZoomFactor(zoomAppDefault());
          setZoomApp(zoomAppDefault());
        },
        icon: getIconTheme("reset"),
      },
    ],
  });
  const menuColor = new MenuItem({
    label: "Cor",
    submenu: [
      {
        label: "Cinza Claro",
        click: () => {
          setColorTextApp(win, "cinzaClaro");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "cinzaClaro",
        icon: getIcon("text-color-light-grey"),
      },
      {
        label: "Amarelo",
        click: () => {
          setColorTextApp(win, "amarelo");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "amarelo",
        icon: getIcon("text-color-yellow"),
      },
      {
        label: "Azul",
        click: () => {
          setColorTextApp(win, "azul");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "azul",
        icon: getIcon("text-color-blue"),
      },
      {
        label: "Laranja",
        click: () => {
          setColorTextApp(win, "laranja");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "laranja",
        icon: getIcon("text-color-orange"),
      },
      {
        label: "Pink",
        click: () => {
          setColorTextApp(win, "pink");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "pink",
        icon: getIcon("text-color-pink"),
      },
      {
        label: "Roxo",
        click: () => {
          setColorTextApp(win, "roxo");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "roxo",
        icon: getIcon("text-color-purple"),
      },
      {
        label: "Verde",
        click: () => {
          setColorTextApp(win, "verde");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: colorTextApp() === "verde",
        icon: getIcon("text-color-green"),
      },
      {
        type: "separator",
      },
      {
        label: "Restaurar Cor",
        click: () => {
          setColorTextApp(win, "cinzaClaro");
          buildTemplateMenu(win);
        },
        icon: getIconTheme("reset"),
      },
    ],
  });
  const menuTheme = new MenuItem({
    label: "Tema",
    submenu: [
      {
        label: "Escuro",
        type: "checkbox",
        checked: themeApp() === "dark",
        click: () => {
          setThemeApp(win, "dark");
          buildTemplateMenu(win);
        },
        icon: getIconTheme("moon"),
      },
      {
        label: "Claro",
        type: "checkbox",
        checked: themeApp() === "light",
        click: () => {
          setThemeApp(win, "light");
          buildTemplateMenu(win);
        },
        icon: getIconTheme("sun"),
      },
      {
        type: "separator",
      },
      {
        label: "Cor do Sistema",
        type: "checkbox",
        checked: themeApp() === "system",
        click: () => {
          setThemeApp(win, "system");
          buildTemplateMenu(win);
        },
        icon: getIconTheme("reset"),
      },
    ],
  });
  const menuHelp = new MenuItem({
    label: "Ajuda",
    submenu: [
      {
        label: "Sobre",
        click: () => createAboutWindow(),
        icon: getIconTheme("about-window"),
      },
    ],
  });

  templateMenu.append(menuTerminal);
  templateMenu.append(menuZoom);
  templateMenu.append(menuColor);
  templateMenu.append(menuTheme);
  templateMenu.append(menuHelp);

  Menu.setApplicationMenu(templateMenu);
};

module.exports = {
  buildTemplateMenu,
};
