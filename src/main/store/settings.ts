import Store from 'electron-store'
import { Settings } from '@main/shared/interfaces/settings'

export const store = new Store<Settings>({
  name: 'settings',
  defaults: {
    colorText: 'lightGrey',
    theme: 'system',
    themeCode: 'material-darker',
    font: 'Inter',
    zoom: 1.2,
    editor: {
      type: 'text',
      name: 'txt'
    }
  }
})
