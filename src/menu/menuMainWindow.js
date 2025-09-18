const path = require("path");
const { Menu, nativeTheme, MenuItem } = require("electron");
const {
  themeApp,
  zoomApp,
  zoomAppDefault,
  editorLanguage,
} = require("../config/config");
const { openFile, saveFile } = require("../helpers/contentFile");
const { dialogNewFile } = require("./dialogFile");
const { createAboutWindow } = require("../pages/aboutWindow");
const { setZoomApp } = require("../preferences/zoom");
const { setEditorLanguage } = require("../preferences/editor");
const { setThemeApp } = require("../preferences/theme");

const buildTemplateMenu = (win) => {
  const getIconTheme = (iconName) => {
    const isDark = nativeTheme.shouldUseDarkColors;
    const themeIcon = isDark ? `${iconName}-dark.png` : `${iconName}-light.png`;
    return path.join(__dirname, "..", "public", "icons", themeIcon);
  };

  const templateMenu = Menu.buildFromTemplate([]);

  const menuLanguage = new MenuItem({
    label: "Linguagem",
    submenu: [
      {
        label: "JavaScript",
        type: "checkbox",
        checked: editorLanguage() === "javascript",
        click: async () => {
          if (editorLanguage() !== "javascript") {
            await dialogNewFile(win);
            await setEditorLanguage(win, "javascript");
            win.webContents.reload();
          }

          buildTemplateMenu(win);
        },
      },
      {
        label: "TypeScript",
        type: "checkbox",
        checked: editorLanguage() === "text/typescript",
        click: async () => {
          if (editorLanguage() !== "text/typescript") {
            await dialogNewFile(win);

            await setEditorLanguage(win, "text/typescript");
            win.webContents.reload();
          }

          buildTemplateMenu(win);
        },
      },
      {
        label: "Python",
        type: "checkbox",
        checked: editorLanguage() === "python",
        click: async () => {
          if (editorLanguage() !== "python") {
            await dialogNewFile(win);
            await setEditorLanguage(win, "python");
            win.webContents.reload();
          }

          buildTemplateMenu(win);
        },
      },
      {
        label: "C#",
        type: "checkbox",
        checked: editorLanguage() === "text/x-csharp",
        click: async () => {
          if (editorLanguage() !== "text/x-csharp") {
            await dialogNewFile(win);
            await setEditorLanguage(win, "text/x-csharp");
            win.webContents.reload();
          }

          buildTemplateMenu(win);
        },
      },
    ],
  });
  const menuFile = new MenuItem({
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
    ],
  });
  const menuEditor = new MenuItem({
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
  const menuTheme = new MenuItem({
    label: "Tema",
    submenu: [
      {
        label: "Material Darker",
        type: "checkbox",
        checked: themeApp() === "material-darker",
        click: () => {
          setThemeApp(win, "material-darker");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Dracula",
        type: "checkbox",
        checked: themeApp() === "dracula",
        click: () => {
          setThemeApp(win, "dracula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Monokai",
        type: "checkbox",
        checked: themeApp() === "monokai",
        click: () => {
          setThemeApp(win, "monokai");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Darcula",
        type: "checkbox",
        checked: themeApp() === "darcula",
        click: () => {
          setThemeApp(win, "darcula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Solarized",
        type: "checkbox",
        checked: themeApp() === "solarized",
        click: () => {
          setThemeApp(win, "solarized");
          buildTemplateMenu(win);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Restaurar Tema",
        click: () => {
          setThemeApp(win, "material-darker");
          buildTemplateMenu(win);
        },
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

  templateMenu.append(menuLanguage);
  templateMenu.append(menuFile);
  templateMenu.append(menuEditor);
  templateMenu.append(menuZoom);
  templateMenu.append(menuTheme);
  templateMenu.append(menuHelp);

  Menu.setApplicationMenu(templateMenu);
};

module.exports = {
  buildTemplateMenu,
};
