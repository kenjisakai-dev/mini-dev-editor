document.addEventListener("DOMContentLoaded", () => {
  const area = document.getElementById("txtArea");
  area.focus();

  api.setTheme((_event, theme) => {
    const htmlRoot = document.documentElement;

    if (theme === "light") {
      htmlRoot.classList.add("light");
    } else {
      htmlRoot.classList.remove("light");
    }
  });

  api.setColor((_event, color) => {
    area.style.color = `var(--${color})`;
  });

  const linha = document.getElementById("linhas");
  numerarLinhas();

  function numerarLinhas() {
    let linhaNumerada = "";
    let listaLinhas = area.value.split("\n");

    for (let i = 1; i <= listaLinhas.length; i++) {
      linhaNumerada += i + "<br>";
    }

    linha.innerHTML = linhaNumerada;
  }

  area.addEventListener("input", () => {
    numerarLinhas();
  });

  api.setFile((_event, fileContent) => {
    const nomeArquivo = document.getElementById("titulo");

    if (fileContent.name === "") {
      nomeArquivo.innerHTML = `Mini Dev Editor`;
    } else {
      nomeArquivo.innerHTML = `${fileContent.name} - Mini Dev Editor`;
    }
    area.value = fileContent.content;
    numerarLinhas();
  });

  area.addEventListener("keyup", () => {
    api.updateContent(area.value);
  });

  area.addEventListener("scroll", () => {
    linha.scrollTop = area.scrollTop;
  });

  api.setFont((_event, font) => {
    document.body.style.fontFamily = font;
    area.style.fontFamily = font;
  });

  api.setEditorType((_event, { editorType, editorName }) => {
    if (editorType === "txt") {
      document.getElementById("txtEditor").style.display = "block";
      document.getElementById("terminal").style.display = "none";
      document.getElementById("codeEditor").style.display = "none";
    }
  });
});
