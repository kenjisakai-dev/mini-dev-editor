import { store } from '@main/store/store'

export default {
  getColorText: () => store.get('colorText', 'lightGrey'),
  getTheme: () => store.get('theme', 'system'),
  getFont: () => store.get('font', 'Inter')
}
