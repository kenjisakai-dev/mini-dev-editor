import Store from 'electron-store'
import { ColorText } from '@main/shared/types/colorText'
import { Theme, ThemeCode } from '@main/shared/types/theme'
import { Font } from '@main/shared/types/font'
import { EditorType } from '@main/shared/types/editor'

export interface Settings {
  colorText: ColorText
  theme: Theme
  font: Font
  zoom: number
  editor: EditorType
  themeCode: ThemeCode
}

export const store = new Store<Settings>({
  name: 'settings',
  defaults: {
    colorText: 'lightGrey',
    theme: 'system',
    font: 'Inter',
    zoom: 1.2,
    editor: {
      type: 'text',
      name: 'txt'
    },
    themeCode: 'material-darker'
  }
})
