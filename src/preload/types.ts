import { FileContent } from '@main/shared/interfaces/fileContent'
import { ColorText } from '@main/shared/types/colorText'
import { Font } from '@main/shared/types/font'
import { Theme } from '@main/shared/types/theme'

export interface API {
  setColorText: (callback: (color: ColorText) => void) => void
  setTheme: (callback: (theme: Theme) => void) => void
  setFont: (callback: (font: Font) => void) => void
  setFile: (callback: (file: FileContent) => void) => void
  updateContent: (content: string) => void
}
