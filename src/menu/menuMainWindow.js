const path = require("path");
const { Menu, nativeTheme, MenuItem } = require("electron");
const {
  colorTextApp,
  themeApp,
  fontApp,
  zoomApp,
  zoomAppDefault,
  editorTypeApp,
  editorNameApp,
  themeAppCode,
} = require("../config/config");
const { openFile, saveFile } = require("../service/contentFile");
const { dialogNewFile } = require("./dialogFile");
const { setThemeApp } = require("../config/theme");
const { setColorTextApp } = require("../config/color");
const { setFontApp } = require("../config/font");
const { createAboutWindow } = require("../pages/aboutWindow");
const { setZoomApp } = require("../config/zoom");
const { setEditorType } = require("../config/editor");
const { setThemeAppCode } = require("../config/themeCode");

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

  const menuType = new MenuItem({
    label: "Tipo",
    submenu: [
      {
        label: "Texto",
        type: "checkbox",
        checked: editorNameApp() === "text",
        click: () => {
          if (editorNameApp() === "text") return;
          if (["javascript"].includes(editorNameApp())) dialogNewFile(win);

          setEditorType(win, "txt", "text");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "Powershell 5",
        type: "checkbox",
        checked: editorNameApp() === "powershell.exe",
        click: () => {
          if (["text", "javascript"].includes(editorNameApp()))
            dialogNewFile(win);

          setEditorType(win, "terminal", "powershell.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "Powershell 7",
        type: "checkbox",
        checked: editorNameApp() === "pwsh.exe",
        click: () => {
          if (["text", "javascript"].includes(editorNameApp()))
            dialogNewFile(win);

          setEditorType(win, "terminal", "pwsh.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "CMD",
        type: "checkbox",
        checked: editorNameApp() === "cmd.exe",
        click: () => {
          if (["javascript"].includes(editorNameApp())) dialogNewFile(win);

          setEditorType(win, "terminal", "cmd.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "JavaScript",
        type: "checkbox",
        checked: editorNameApp() === "javascript",
        click: () => {
          if (editorNameApp() === "javascript") return;
          if (["text"].includes(editorNameApp())) dialogNewFile(win);

          setEditorType(win, "code", "javascript");
          buildTemplateMenu(win);
          win.webContents.reload();
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
  const menuFont = new MenuItem({
    label: "Fonte",
    submenu: [
      {
        label: "Source Code Pro",
        click: () => {
          setFontApp(win, "Source Code Pro");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Source Code Pro",
      },
      {
        label: "Inter",
        click: () => {
          setFontApp(win, "Inter");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Inter",
      },
      {
        label: "Bebas Neue",
        click: () => {
          setFontApp(win, "Bebas Neue");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Bebas Neue",
      },
      {
        label: "Arial",
        click: () => {
          setFontApp(win, "Arial");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Arial",
      },
      {
        type: "separator",
      },
      {
        label: "Restaurar Fonte",
        click: () => {
          setFontApp(win, "Source Code Pro");
          buildTemplateMenu(win);
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
  const menuThemeCode = new MenuItem({
    label: "Tema",
    submenu: [
      {
        label: "Material Darker",
        type: "checkbox",
        checked: themeAppCode() === "material-darker",
        click: () => {
          setThemeAppCode(win, "material-darker");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Dracula",
        type: "checkbox",
        checked: themeAppCode() === "dracula",
        click: () => {
          setThemeAppCode(win, "dracula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Monokai",
        type: "checkbox",
        checked: themeAppCode() === "monokai",
        click: () => {
          setThemeAppCode(win, "monokai");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Darcula",
        type: "checkbox",
        checked: themeAppCode() === "darcula",
        click: () => {
          setThemeAppCode(win, "darcula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Solarized",
        type: "checkbox",
        checked: themeAppCode() === "solarized",
        click: () => {
          setThemeAppCode(win, "solarized");
          buildTemplateMenu(win);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Restaurar Tema",
        click: () => {
          setThemeAppCode(win, "material-darker");
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

  if (editorTypeApp() === "txt") {
    templateMenu.append(menuType);
    templateMenu.append(menuFile);
    templateMenu.append(menuEditor);
    templateMenu.append(menuFont);
    templateMenu.append(menuZoom);
    templateMenu.append(menuColor);
    templateMenu.append(menuTheme);
    templateMenu.append(menuHelp);
  }

  if (editorTypeApp() === "terminal") {
    templateMenu.append(menuType);
    templateMenu.append(menuZoom);
    templateMenu.append(menuColor);
    templateMenu.append(menuTheme);
    templateMenu.append(menuHelp);
  }

  if (editorTypeApp() === "code") {
    templateMenu.append(menuType);
    templateMenu.append(menuFile);
    templateMenu.append(menuEditor);
    templateMenu.append(menuZoom);
    templateMenu.append(menuThemeCode);
    templateMenu.append(menuHelp);
  }

  Menu.setApplicationMenu(templateMenu);
};

module.exports = {
  buildTemplateMenu,
};
