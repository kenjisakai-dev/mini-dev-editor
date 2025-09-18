document.addEventListener("DOMContentLoaded", () => {
  api.setEditorLanguage((_event, editorLanguage) => {
    createCodeEditor(editorLanguage);
  });

  function createCodeEditor(editorLanguage) {
    let codeEditor = document.getElementById("codeEditor");
    codeEditor.innerHTML = "";

    var editor = CodeMirror(codeEditor, {
      mode: editorLanguage,
      theme: "material-darker",
      lineNumbers: true,
      autofocus: true,
      tabSize: 2,
      indentUnit: 2,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: false,
    });

    editor.setSize("100%", "100%");
    editor.refresh();

    codeEditor.addEventListener("keyup", () => {
      api.updateContent(editor.getValue());
    });

    api.setTheme((_event, themeCode) => {
      const htmlRoot = document.documentElement;
      htmlRoot.classList.toggle("light", themeCode === "solarized");

      editor.setOption("theme", themeCode);
    });

    api.setFile((_event, fileContent) => {
      if (fileContent.name === "") {
        nomeArquivo.innerHTML = `Mini Dev Editor`;
      } else {
        nomeArquivo.innerHTML = `${fileContent.name} - Mini Dev Editor`;
      }

      editor.setValue(fileContent.content);
    });
  }
});
