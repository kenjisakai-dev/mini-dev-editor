interface CodeMirrorEditor {
  getValue(): string
  setValue(value: string): void
  setSize(width: string | number, height: string | number): void
  refresh(): void
  setOption(option: string, value: any): void
  focus(): void
  getDoc(): any
  on(event: string, handler: Function): void
  off(event: string, handler: Function): void
}

interface CodeMirrorConfig {
  mode?: string
  theme?: string
  lineNumbers?: boolean
  autofocus?: boolean
  tabSize?: number
  indentUnit?: number
  matchBrackets?: boolean
  autoCloseBrackets?: boolean
  styleActiveLine?: boolean
  readOnly?: boolean
  placeholder?: string
  lineWrapping?: boolean
  [key: string]: any
}

declare const CodeMirror: {
  (element: HTMLElement, config: CodeMirrorConfig): CodeMirrorEditor
  fromTextArea?: (textarea: HTMLTextAreaElement, config: CodeMirrorConfig) => CodeMirrorEditor
}
