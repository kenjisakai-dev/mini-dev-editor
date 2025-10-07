import { ColorText } from '@main/shared/types/colorText'
import { EditorType } from '@main/shared/types/editor'
import { Font } from '@main/shared/types/font'
import { Theme, ThemeCode } from '@main/shared/types/theme'

export interface Settings {
  colorText: ColorText
  theme: Theme
  themeCode: ThemeCode
  font: Font
  zoom: number
  editor: EditorType
}
