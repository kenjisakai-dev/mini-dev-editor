import { BrowserWindow, Menu, MenuItem, nativeTheme } from 'electron'
import path from 'path'
import { setColorText } from '@main/preferences/color'
import config from '@main/preferences/config'
import { setTheme } from '@main/preferences/theme'
import { setFont } from '@main/preferences/font'
import {
  permissionZoomIn,
  permissionZoomOut,
  setZoom,
  zoomAppDefault,
  zoomIn,
  zoomOut
} from '../preferences/zoom'
import { newFile, openFile, saveFile } from '../helpers/contentFile'
import { createAboutWindow } from '../pages/aboutWindow'

export const mainWindowMenu = (mainWindow: BrowserWindow) => {
  const getIcon = (icon: string) => {
    return path.join(__dirname, `../../src/main/menu/icons/${icon}.png`)
  }

  const getIconTheme = (icon: string) => {
    const isDark = nativeTheme.shouldUseDarkColors
    const iconTheme = isDark ? `${icon}-dark.png` : `${icon}-light.png`
    return path.resolve(__dirname, `../../src/main/menu/icons`, iconTheme)
  }

  const templateMenu = Menu.buildFromTemplate([])

  const menuFile = new MenuItem({
    label: 'Arquivo',
    submenu: [
      {
        label: 'Novo',
        accelerator: 'CmdOrCtrl+N',
        click: () => newFile(mainWindow),
        icon: getIconTheme('new-file')
      },
      {
        label: 'Abrir',
        accelerator: 'CmdOrCtrl+O',
        click: () => openFile(mainWindow),
        icon: getIconTheme('open-file')
      },
      {
        label: 'Salvar',
        accelerator: 'CmdOrCtrl+S',
        click: () => saveFile(mainWindow, false),
        icon: getIconTheme('save-file')
      },
      {
        label: 'Salvar Como',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => saveFile(mainWindow, true),
        icon: getIconTheme('save-as-file')
      }
    ]
  })
  const menuEditor = new MenuItem({
    label: 'Editor',
    submenu: [
      {
        label: 'Desfazer',
        role: 'undo',
        icon: getIconTheme('undo')
      },
      {
        label: 'Refazer',
        role: 'redo',
        accelerator: 'CmdOrCtrl+Y',
        icon: getIconTheme('redo')
      },
      {
        type: 'separator'
      },
      {
        label: 'Recortar',
        role: 'cut',
        icon: getIconTheme('cut')
      },
      {
        label: 'Copiar',
        role: 'copy',
        accelerator: 'CmdOrCtrl+C',
        icon: getIconTheme('copy')
      },
      {
        label: 'Colar',
        role: 'paste',
        accelerator: 'CmdOrCtrl+V',
        icon: getIconTheme('paste')
      },
      {
        type: 'separator'
      },
      {
        label: 'Recarregar',
        role: 'reload',
        accelerator: 'CmdOrCtrl+R',
        icon: getIconTheme('reload')
      }
    ]
  })
  const menuColor = new MenuItem({
    label: 'Cor',
    submenu: [
      {
        label: 'Cinza Claro',
        click: () => {
          setColorText(mainWindow, 'lightGrey')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'lightGrey',
        enabled: config.getColorText() !== 'lightGrey',
        icon: getIcon('text-color-light-grey')
      },
      {
        label: 'Amarelo',
        click: () => {
          setColorText(mainWindow, 'yellow')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'yellow',
        enabled: config.getColorText() !== 'yellow',
        icon: getIcon('text-color-yellow')
      },
      {
        label: 'Azul',
        click: () => {
          setColorText(mainWindow, 'blue')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'blue',
        enabled: config.getColorText() !== 'blue',
        icon: getIcon('text-color-blue')
      },
      {
        label: 'Laranja',
        click: () => {
          setColorText(mainWindow, 'orange')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'orange',
        enabled: config.getColorText() !== 'orange',
        icon: getIcon('text-color-orange')
      },
      {
        label: 'Pink',
        click: () => {
          setColorText(mainWindow, 'pink')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'pink',
        enabled: config.getColorText() !== 'pink',
        icon: getIcon('text-color-pink')
      },
      {
        label: 'Roxo',
        click: () => {
          setColorText(mainWindow, 'purple')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'purple',
        enabled: config.getColorText() !== 'purple',
        icon: getIcon('text-color-purple')
      },
      {
        label: 'Verde',
        click: () => {
          setColorText(mainWindow, 'green')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getColorText() === 'green',
        enabled: config.getColorText() !== 'green',
        icon: getIcon('text-color-green')
      },
      {
        type: 'separator'
      },
      {
        label: 'Restaurar Cor',
        click: () => {
          setColorText(mainWindow, 'lightGrey')
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('reset')
      }
    ]
  })
  const menuTheme = new MenuItem({
    label: 'Tema',
    submenu: [
      {
        label: 'Escuro',
        type: 'checkbox',
        checked: config.getTheme() === 'dark',
        enabled: config.getTheme() !== 'dark',
        click: () => {
          setTheme(mainWindow, 'dark')
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('moon')
      },
      {
        label: 'Claro',
        type: 'checkbox',
        checked: config.getTheme() === 'light',
        enabled: config.getTheme() !== 'light',
        click: () => {
          setTheme(mainWindow, 'light')
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('sun')
      },
      {
        type: 'separator'
      },
      {
        label: 'Cor do Sistema',
        type: 'checkbox',
        checked: config.getTheme() === 'system',
        click: () => {
          setTheme(mainWindow, 'system')
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('reset')
      }
    ]
  })
  const menuFont = new MenuItem({
    label: 'Fonte',
    submenu: [
      {
        label: 'Inter',
        click: () => {
          setFont(mainWindow, 'Inter')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getFont() === 'Inter',
        enabled: config.getFont() !== 'Inter'
      },
      {
        label: 'Source Code Pro',
        click: () => {
          setFont(mainWindow, 'Source Code Pro')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getFont() === 'Source Code Pro',
        enabled: config.getFont() !== 'Source Code Pro'
      },
      {
        label: 'Bebas Neue',
        click: () => {
          setFont(mainWindow, 'Bebas Neue')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getFont() === 'Bebas Neue',
        enabled: config.getFont() !== 'Bebas Neue'
      },
      {
        label: 'Arial',
        click: () => {
          setFont(mainWindow, 'Arial')
          mainWindowMenu(mainWindow)
        },
        type: 'checkbox',
        checked: config.getFont() === 'Arial',
        enabled: config.getFont() !== 'Arial'
      },
      {
        type: 'separator'
      },
      {
        label: 'Restaurar Fonte',
        click: () => {
          setFont(mainWindow, 'Inter')
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('reset')
      }
    ]
  })
  const menuZoom = new MenuItem({
    label: 'Zoom',
    submenu: [
      {
        label: 'Aplicar zoom',
        accelerator: 'CmdOrCtrl+=',
        enabled: permissionZoomIn(),
        click: () => {
          setZoom(mainWindow, zoomIn())
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('zoom-in')
      },
      {
        label: 'Reduzir zoom',
        accelerator: 'CmdOrCtrl+-',
        enabled: permissionZoomOut(),
        click: () => {
          setZoom(mainWindow, zoomOut())
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('zoom-out')
      },
      {
        type: 'separator'
      },
      {
        label: 'Restaurar zoom',
        accelerator: 'CmdOrCtrl+0',
        click: () => {
          setZoom(mainWindow, zoomAppDefault())
          mainWindowMenu(mainWindow)
        },
        icon: getIconTheme('reset')
      }
    ]
  })
  const menuHelp = new MenuItem({
    label: 'Ajuda',
    submenu: [
      {
        label: 'Sobre',
        click: () => createAboutWindow(),
        icon: getIconTheme('about-window')
      }
    ]
  })

  templateMenu.append(menuFile)
  templateMenu.append(menuEditor)
  templateMenu.append(menuColor)
  templateMenu.append(menuTheme)
  templateMenu.append(menuFont)
  templateMenu.append(menuZoom)
  templateMenu.append(menuHelp)

  Menu.setApplicationMenu(templateMenu)
}
