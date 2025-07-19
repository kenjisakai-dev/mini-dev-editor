const path = require("path");
const { Menu, nativeImage, nativeTheme } = require("electron");
const { colorTextApp, themeApp } = require("../config/config");
const { openFile, saveFile } = require("../service/contentFile");
const { dialogNewFile, dialogConfirmExit } = require("./dialogFile");
const { setThemeApp } = require("../config/theme");
const { setColorText } = require("../config/color");
const { createAboutWindow } = require("../pages/aboutWindow");

const buildTemplateMenu = (win) => {
  const getIcon = (iconName) => {
    return nativeImage.createFromPath(
      path.join(__dirname, "..", "public", "icons", `${iconName}.png`)
    );
  };

  const getIconTheme = (iconName) => {
    const isDark = nativeTheme.shouldUseDarkColors;
    const themeIcon = isDark ? `${iconName}-dark.png` : `${iconName}-light.png`;
    return nativeImage.createFromPath(
      path.join(__dirname, "..", "public", "icons", themeIcon)
    );
  };

  const templateMenu = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Novo",
          accelerator: "CmdOrCtrl+N",
          click: () => dialogNewFile(win),
          icon: getIconTheme("new-file"),
        },
        {
          label: "Abrir",
          accelerator: "CmdOrCtrl+O",
          click: () => openFile(win),
          icon: getIconTheme("open-file"),
        },
        {
          label: "Salvar",
          accelerator: "CmdOrCtrl+S",
          click: () => saveFile(win, false),
          icon: getIconTheme("save-file"),
        },
        {
          label: "Salvar Como",
          accelerator: "CmdOrCtrl+Shift+S",
          click: () => saveFile(win, true),
          icon: getIconTheme("save-as-file"),
        },
        {
          type: "separator",
        },
        {
          label: "Sair",
          click: () => dialogConfirmExit(win),
          accelerator: "Alt+F4",
          icon: getIconTheme("quit-app"),
        },
      ],
    },
    {
      label: "Editor",
      submenu: [
        {
          label: "Desfazer",
          role: "undo",
          accelerator: "CmdOrCtrl+Z",
          icon: getIconTheme("undo"),
        },
        {
          label: "Refazer",
          role: "redo",
          accelerator: "CmdOrCtrl+Y",
          icon: getIconTheme("redo"),
        },
        {
          type: "separator",
        },
        {
          label: "Recortar",
          role: "cut",
          accelerator: "CmdOrCtrl+X",
          icon: getIconTheme("cut"),
        },
        {
          label: "Copiar",
          role: "copy",
          accelerator: "CmdOrCtrl+C",
          icon: getIconTheme("copy"),
        },
        {
          label: "Colar",
          role: "paste",
          accelerator: "CmdOrCtrl+V",
          icon: getIconTheme("paste"),
        },
        {
          type: "separator",
        },
        {
          label: "Recarregar",
          role: "reload",
          accelerator: "CmdOrCtrl+R",
          icon: getIconTheme("reload"),
        },
      ],
    },
    {
      label: "Zoom",
      submenu: [
        {
          label: "Aplicar zoom",
          role: "zoomIn",
          accelerator: "CmdOrCtrl+=",
          icon: getIconTheme("zoom-in"),
        },
        {
          label: "Reduzir zoom",
          role: "zoomOut",
          accelerator: "CmdOrCtrl+-",
          icon: getIconTheme("zoom-out"),
        },
        {
          label: "Restaurar zoom",
          role: "resetZoom",
          accelerator: "CmdOrCtrl+0",
          icon: getIconTheme("zoom-reset"),
        },
      ],
    },
    {
      label: "Cor",
      submenu: [
        {
          label: "Cinza Claro",
          click: () => {
            setColorText(win, "cinzaClaro");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "cinzaClaro",
          icon: getIcon("text-color-light-grey"),
        },
        {
          label: "Amarelo",
          click: () => {
            setColorText(win, "amarelo");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "amarelo",
          icon: getIcon("text-color-yellow"),
        },
        {
          label: "Azul",
          click: () => {
            setColorText(win, "azul");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "azul",
          icon: getIcon("text-color-blue"),
        },
        {
          label: "Laranja",
          click: () => {
            setColorText(win, "laranja");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "laranja",
          icon: getIcon("text-color-orange"),
        },
        {
          label: "Pink",
          click: () => {
            setColorText(win, "pink");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "pink",
          icon: getIcon("text-color-pink"),
        },
        {
          label: "Roxo",
          click: () => {
            setColorText(win, "roxo");
            buildTemplateMenu(win);
          },
          type: "checkbox",
          checked: colorTextApp() === "roxo",
          icon: getIcon("text-color-purple"),
        },
        {
          label: "Verde",
          click: () => {
            setColorText(win, "verde");
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
          label: "Restaurar cor",
          click: () => {
            setColorText(win, "cinzaClaro");
            buildTemplateMenu(win);
          },
          icon: getIconTheme("reset"),
        },
      ],
    },
    {
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
          label: "Cor do sistema",
          type: "checkbox",
          checked: themeApp() === "system",
          click: () => {
            setThemeApp(win, "system");
            buildTemplateMenu(win);
          },
          icon: getIconTheme("reset"),
        },
      ],
    },
    {
      label: "Ajuda",
      submenu: [
        {
          label: "Sobre",
          click: () => createAboutWindow(),
          icon: getIconTheme("about-window"),
        },
      ],
    },
  ];

  const templateMenuBuild = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(templateMenuBuild);
};

module.exports = {
  buildTemplateMenu,
};
