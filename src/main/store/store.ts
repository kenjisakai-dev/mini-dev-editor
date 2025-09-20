import Store from 'electron-store'
import { ColorText } from '@main/shared/types/colorText'
import { Theme } from '@main/shared/types/theme'
import { Font } from '@main/shared/types/font'

export interface Settings {
  colorText: ColorText
  theme: Theme
  font: Font
  zoom: number
}

export const store = new Store<Settings>({
  name: 'settings',
  defaults: {
    colorText: 'lightGrey',
    theme: 'system',
    font: 'Inter',
    zoom: 1.2
  }
})
