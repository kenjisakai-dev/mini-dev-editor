import { store } from '@main/store/settings'

export default {
  getColorText: () => store.get('colorText', 'lightGrey'),
  getTheme: () => store.get('theme', 'system'),
  getThemeCode: () => store.get('themeCode', 'material-darker'),
  getFont: () => store.get('font', 'Inter'),
  getZoom: () => store.get('zoom', 1.2),
  getEditor: () => store.get('editor', { type: 'text', name: 'txt' })
}
