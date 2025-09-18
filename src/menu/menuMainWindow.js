const path = require("path");
const { Menu, nativeTheme, MenuItem } = require("electron");
const {
  colorTextApp,
  themeApp,
  fontApp,
  zoomAppDefault,
  editorTypeApp,
  editorNameApp,
  themeAppCode,
} = require("../config/config");
const { openFile, saveFile } = require("../helpers/contentFile");
const { dialogNewFile } = require("./dialogFile");
const { setThemeApp } = require("../preferences/theme");
const { setColorTextApp } = require("../preferences/color");
const { setFontApp } = require("../preferences/font");
const { createAboutWindow } = require("../pages/aboutWindow");
const {
  setZoomApp,
  permissionZoomIn,
  zoomIn,
  permissionZoomOut,
  zoomOut,
} = require("../preferences/zoom");
const { setEditorType } = require("../preferences/editor");
const { setThemeAppCode } = require("../preferences/themeCode");

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
        label: "Editor de Texto",
        enabled: false,
      },
      {
        label: "Texto",
        type: "checkbox",
        checked: editorNameApp() === "text",
        enabled: editorNameApp() === "text" ? false : true,
        click: async () => {
          if (editorTypeApp() === "code") await dialogNewFile(win);

          await setEditorType(win, "txt", "text");
          win.webContents.reload();
          buildTemplateMenu(win);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Editor de Código",
        enabled: false,
      },
      {
        label: "JavaScript",
        type: "checkbox",
        checked: editorNameApp() === "javascript",
        enabled: editorNameApp() === "javascript" ? false : true,
        click: async () => {
          const types = ["text", "text/typescript", "python", "text/x-csharp"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "code", "javascript");
          win.webContents.reload();
          buildTemplateMenu(win);
        },
      },
      {
        label: "TypeScript",
        type: "checkbox",
        checked: editorNameApp() === "text/typescript",
        enabled: editorNameApp() === "text/typescript" ? false : true,
        click: async () => {
          const types = ["text", "javascript", "python", "text/x-csharp"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "code", "text/typescript");
          win.webContents.reload();
          buildTemplateMenu(win);
        },
      },
      {
        label: "Python",
        type: "checkbox",
        checked: editorNameApp() === "python",
        enabled: editorNameApp() === "python" ? false : true,
        click: async () => {
          const types = [
            "text",
            "javascript",
            "text/typescript",
            "text/x-csharp",
          ];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "code", "python");
          win.webContents.reload();
          buildTemplateMenu(win);
        },
      },
      {
        label: "C#",
        type: "checkbox",
        checked: editorNameApp() === "text/x-csharp",
        enabled: editorNameApp() === "text/x-csharp" ? false : true,
        click: async () => {
          const types = ["text", "javascript", "text/typescript", "python"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "code", "text/x-csharp");
          win.webContents.reload();
          buildTemplateMenu(win);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Terminal",
        enabled: false,
      },
      {
        label: "Powershell 5",
        type: "checkbox",
        checked: editorNameApp() === "powershell.exe",
        enabled: editorNameApp() === "powershell.exe" ? false : true,
        click: async () => {
          const types = ["text", "javascript", "python"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "terminal", "powershell.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "Powershell 7",
        type: "checkbox",
        checked: editorNameApp() === "pwsh.exe",
        enabled: editorNameApp() === "pwsh.exe" ? false : true,
        click: async () => {
          const types = ["text", "javascript", "python"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "terminal", "pwsh.exe");
          buildTemplateMenu(win);
          win.webContents.reload();
        },
      },
      {
        label: "CMD",
        type: "checkbox",
        checked: editorNameApp() === "cmd.exe",
        enabled: editorNameApp() === "cmd.exe" ? false : true,
        click: async () => {
          const types = ["text", "javascript", "python"];
          if (types.includes(editorNameApp())) {
            await dialogNewFile(win);
          }

          await setEditorType(win, "terminal", "cmd.exe");
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
        enabled: permissionZoomIn(),
        click: () => {
          setZoomApp(win, zoomIn());
          buildTemplateMenu(win);
        },
        icon: getIconTheme("zoom-in"),
      },
      {
        label: "Reduzir zoom",
        accelerator: "CmdOrCtrl+-",
        enabled: permissionZoomOut(),
        click: () => {
          setZoomApp(win, zoomOut());
          buildTemplateMenu(win);
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
          setZoomApp(win, zoomAppDefault());
          buildTemplateMenu(win);
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
        enabled: fontApp() === "Source Code Pro" ? false : true,
      },
      {
        label: "Inter",
        click: () => {
          setFontApp(win, "Inter");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Inter",
        enabled: fontApp() === "Inter" ? false : true,
      },
      {
        label: "Bebas Neue",
        click: () => {
          setFontApp(win, "Bebas Neue");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Bebas Neue",
        enabled: fontApp() === "Bebas Neue" ? false : true,
      },
      {
        label: "Arial",
        click: () => {
          setFontApp(win, "Arial");
          buildTemplateMenu(win);
        },
        type: "checkbox",
        checked: fontApp() === "Arial",
        enabled: fontApp() === "Arial" ? false : true,
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
        enabled: colorTextApp() === "cinzaClaro" ? false : true,
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
        enabled: colorTextApp() === "amarelo" ? false : true,
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
        enabled: colorTextApp() === "azul" ? false : true,
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
        enabled: colorTextApp() === "laranja" ? false : true,
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
        enabled: colorTextApp() === "pink" ? false : true,
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
        enabled: colorTextApp() === "roxo" ? false : true,
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
        enabled: colorTextApp() === "verde" ? false : true,
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
        enabled: themeApp() === "dark" ? false : true,
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
        enabled: themeApp() === "light" ? false : true,
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
        enabled: themeAppCode() === "material-darker" ? false : true,
        click: () => {
          setThemeAppCode(win, "material-darker");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Dracula",
        type: "checkbox",
        checked: themeAppCode() === "dracula",
        enabled: themeAppCode() === "dracula" ? false : true,
        click: () => {
          setThemeAppCode(win, "dracula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Monokai",
        type: "checkbox",
        checked: themeAppCode() === "monokai",
        enabled: themeAppCode() === "monokai" ? false : true,
        click: () => {
          setThemeAppCode(win, "monokai");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Darcula",
        type: "checkbox",
        checked: themeAppCode() === "darcula",
        enabled: themeAppCode() === "darcula" ? false : true,
        click: () => {
          setThemeAppCode(win, "darcula");
          buildTemplateMenu(win);
        },
      },
      {
        label: "Solarized",
        type: "checkbox",
        checked: themeAppCode() === "solarized",
        enabled: themeAppCode() === "solarized" ? false : true,
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
