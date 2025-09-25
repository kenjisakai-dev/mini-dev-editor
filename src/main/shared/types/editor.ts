export type TextEditor = {
  type: 'text'
  name: 'txt'
}

export type CodeEditor = {
  type: 'code'
  name: 'javascript' | 'text/typescript' | 'python' | 'text/x-csharp'
}

export type EditorType = TextEditor | CodeEditor
