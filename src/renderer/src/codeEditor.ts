document.addEventListener('DOMContentLoaded', () => {
  window.api.setEditor(({ type, name }) => {
    if (type === 'code') createCodeEditor(name)
  })

  function createCodeEditor(editorName: string) {
    const codeEditor = document.getElementById('codeEditor') as HTMLDivElement
    codeEditor.innerHTML = ''

    const config: CodeMirrorConfig = {
      mode: editorName,
      theme: 'material-darker',
      lineNumbers: true,
      autofocus: true,
      tabSize: 2,
      indentUnit: 2,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: false
    }

    const editor = CodeMirror(codeEditor, config)

    editor.setSize('100%', '100%')
    editor.refresh()

    codeEditor.addEventListener('keyup', () => {
      window.api.updateContent(editor.getValue())
    })

    window.api.setThemeCode((theme) => {
      editor.setOption('theme', theme)
    })

    window.api.setFile(({ content }) => {
      editor.setValue(content)
    })
  }
})
