document.addEventListener("DOMContentLoaded", () => {
  const area = document.getElementById("txtArea");
  area.focus();

  window.api.setTheme((_event, theme) => {
    const htmlRoot = document.documentElement;
    htmlRoot.classList.toggle("light", theme === "light");
  });

  window.api.setColor((_event, color) => {
    area.style.color = `var(--${color})`;
  });

  window.api.setFont((_event, font) => {
    document.body.style.fontFamily = font;
    area.style.fontFamily = font;
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

  window.api.setFile((_event, fileContent) => {
    const title = document.title;

    if (fileContent.name === "") {
      title.innerHTML = `Mini Dev Editor`;
    } else {
      title.innerHTML = `${fileContent.name} - Mini Dev Editor`;
    }
    area.value = fileContent.content;
    numerarLinhas();
  });

  area.addEventListener("keyup", () => {
    window.api.updateContent(area.value);
  });

  area.addEventListener("scroll", () => {
    linha.scrollTop = area.scrollTop;
  });
});
