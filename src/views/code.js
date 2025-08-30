document.addEventListener("DOMContentLoaded", () => {
  api.setEditorType((_event, { editorType, editorName }) => {
    if (editorType === "code") {
      document.getElementById("txtEditor").style.display = "none";
      document.getElementById("terminal").style.display = "none";
      document.getElementById("codeEditor").style.display = "block";
      createCodeEditor(editorName);
    }
  });

  function createCodeEditor(editorName) {
    let codeEditor = document.getElementById("codeEditor");
    codeEditor.innerHTML = "";

    var editor = CodeMirror(codeEditor, {
      mode: editorName,
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

    api.setThemeCode((_event, themeCode) => {
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
