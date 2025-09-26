import { BrowserWindow, Menu, MenuItem, nativeTheme } from 'electron'
import path from 'path'
import { setColorText } from '@main/preferences/color'
import config from '@main/preferences/config'
import { setTheme, setThemeCode } from '@main/preferences/theme'
import { setFont } from '@main/preferences/font'
import {
  permissionZoomIn,
  permissionZoomOut,
  setZoom,
  zoomAppDefault,
  zoomIn,
  zoomOut
} from '@main/preferences/zoom'
import { setEditor } from '@main/preferences/editor'
import { newFile, openFile, saveFile } from '@main/helpers/contentFile'
import { createAboutWindow } from '@main/pages/aboutWindow'

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

  const menuTextEditor = new MenuItem({
    label: 'Texto',
    submenu: [
      {
        label: 'Texto',
        type: 'checkbox',
        checked: config.getEditor().name === 'txt',
        enabled: config.getEditor().name !== 'txt',
        click: async () => {
          await newFile(mainWindow)
          await setEditor(mainWindow, { type: 'text', name: 'txt' })
          mainWindowMenu(mainWindow)
        }
      }
    ]
  })
  const menuCodeEditor = new MenuItem({
    label: 'Código',
    submenu: [
      {
        label: 'JavaScript',
        type: 'checkbox',
        checked: config.getEditor().name === 'javascript',
        enabled: config.getEditor().name !== 'javascript',
        click: async () => {
          await newFile(mainWindow)
          await setEditor(mainWindow, { type: 'code', name: 'javascript' })
          mainWindowMenu(mainWindow)
        }
      },
      {
        label: 'TypeScript',
        type: 'checkbox',
        checked: config.getEditor().name === 'text/typescript',
        enabled: config.getEditor().name !== 'text/typescript',
        click: async () => {
          await newFile(mainWindow)
          await setEditor(mainWindow, { type: 'code', name: 'text/typescript' })
          mainWindowMenu(mainWindow)
        }
      },
      {
        label: 'Python',
        type: 'checkbox',
        checked: config.getEditor().name === 'python',
        enabled: config.getEditor().name !== 'python',
        click: async () => {
          await newFile(mainWindow)
          await setEditor(mainWindow, { type: 'code', name: 'python' })
          mainWindowMenu(mainWindow)
        }
      },
      {
        label: 'C#',
        type: 'checkbox',
        checked: config.getEditor().name === 'text/x-csharp',
        enabled: config.getEditor().name !== 'text/x-csharp',
        click: async () => {
          await newFile(mainWindow)
          await setEditor(mainWindow, { type: 'code', name: 'text/x-csharp' })
          mainWindowMenu(mainWindow)
        }
      }
    ]
  })
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
  const menuColor = new MenuItem(
    ['text'].includes(config.getEditor().type)
      ? {
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
        }
      : { visible: false }
  )
  const menuTheme = new MenuItem(
    ['text', 'code'].includes(config.getEditor().type)
      ? {
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
        }
      : { visible: false }
  )
  const menuThemeCode = new MenuItem(
    ['code'].includes(config.getEditor().type)
      ? {
          label: 'Tema do Código',
          submenu: [
            {
              label: 'Material Darker',
              type: 'checkbox',
              checked: config.getThemeCode() === 'material-darker',
              enabled: config.getThemeCode() !== 'material-darker',
              click: () => {
                setThemeCode(mainWindow, 'material-darker')
                mainWindowMenu(mainWindow)
              }
            },
            {
              label: 'Dracula',
              type: 'checkbox',
              checked: config.getThemeCode() === 'dracula',
              enabled: config.getThemeCode() !== 'dracula',
              click: () => {
                setThemeCode(mainWindow, 'dracula')
                mainWindowMenu(mainWindow)
              }
            },
            {
              label: 'Monokai',
              type: 'checkbox',
              checked: config.getThemeCode() === 'monokai',
              enabled: config.getThemeCode() !== 'monokai',
              click: () => {
                setThemeCode(mainWindow, 'monokai')
                mainWindowMenu(mainWindow)
              }
            },
            {
              label: 'Darcula',
              type: 'checkbox',
              checked: config.getThemeCode() === 'darcula',
              enabled: config.getThemeCode() !== 'darcula',
              click: () => {
                setThemeCode(mainWindow, 'darcula')
                mainWindowMenu(mainWindow)
              }
            },
            {
              label: 'Solarized',
              type: 'checkbox',
              checked: config.getThemeCode() === 'solarized',
              enabled: config.getThemeCode() !== 'solarized',
              click: () => {
                setThemeCode(mainWindow, 'solarized')
                mainWindowMenu(mainWindow)
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Restaurar Tema',
              click: () => {
                setThemeCode(mainWindow, 'material-darker')
                mainWindowMenu(mainWindow)
              }
            }
          ]
        }
      : { visible: false }
  )
  const menuFont = new MenuItem(
    ['text'].includes(config.getEditor().type)
      ? {
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
              enabled: config.getFont() !== 'Inter',
              icon: getIconTheme('language')
            },
            {
              label: 'Source Code Pro',
              click: () => {
                setFont(mainWindow, 'Source Code Pro')
                mainWindowMenu(mainWindow)
              },
              type: 'checkbox',
              checked: config.getFont() === 'Source Code Pro',
              enabled: config.getFont() !== 'Source Code Pro',
              icon: getIconTheme('language')
            },
            {
              label: 'Bebas Neue',
              click: () => {
                setFont(mainWindow, 'Bebas Neue')
                mainWindowMenu(mainWindow)
              },
              type: 'checkbox',
              checked: config.getFont() === 'Bebas Neue',
              enabled: config.getFont() !== 'Bebas Neue',
              icon: getIconTheme('language')
            },
            {
              label: 'Arial',
              click: () => {
                setFont(mainWindow, 'Arial')
                mainWindowMenu(mainWindow)
              },
              type: 'checkbox',
              checked: config.getFont() === 'Arial',
              enabled: config.getFont() !== 'Arial',
              icon: getIconTheme('language')
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
        }
      : { visible: false }
  )
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

  const editorSubmenu = new Menu()
  editorSubmenu.append(menuTextEditor)
  editorSubmenu.append(menuCodeEditor)

  const menuEditorType = new MenuItem({
    label: 'Tipo',
    submenu: editorSubmenu
  })

  const preferencesSubmenu = new Menu()
  preferencesSubmenu.append(menuTheme)
  preferencesSubmenu.append(menuThemeCode)
  preferencesSubmenu.append(menuColor)
  preferencesSubmenu.append(menuFont)
  preferencesSubmenu.append(menuZoom)

  const menuPreferences = new MenuItem({
    label: 'Preferências',
    submenu: preferencesSubmenu
  })

  templateMenu.append(menuEditorType)
  templateMenu.append(menuFile)
  templateMenu.append(menuEditor)
  templateMenu.append(menuPreferences)
  templateMenu.append(menuHelp)

  Menu.setApplicationMenu(templateMenu)
}
