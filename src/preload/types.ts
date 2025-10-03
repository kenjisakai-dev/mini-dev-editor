import { FileContent } from '@main/shared/interfaces/fileContent'
import { ColorText } from '@main/shared/types/colorText'
import { Font } from '@main/shared/types/font'
import { Theme, ThemeCode } from '@main/shared/types/theme'
import { EditorType } from '@main/shared/types/editor'

export interface TerminalOutput {
  finished: boolean
  message: string
  editorName: string
  numericMessage: number
}

export interface API {
  setColorText: (callback: (color: ColorText) => void) => void
  setTheme: (callback: (theme: Theme) => void) => void
  setThemeCode: (callback: (theme: ThemeCode) => void) => void
  setFont: (callback: (font: Font) => void) => void
  setEditor: (callback: (editor: EditorType) => void) => void
  setFile: (callback: (file: FileContent) => void) => void
  updateContent: (content: string) => void

  terminalInput: (command: string) => void
  terminalOutput: (callback: (output: TerminalOutput) => void) => void
  getHistoryCommands: () => Promise<string[]>
  appendHistoryCommand: (command: string) => void
}
