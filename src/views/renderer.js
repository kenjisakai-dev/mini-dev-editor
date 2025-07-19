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
  area.style.color = color;
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

const nomeArquivo = document.getElementById("titulo");

api.setFile((_event, fileContent) => {
  if (fileContent.name === "") {
    nomeArquivo.innerHTML = `Mini Dev Editor`;
  } else {
    nomeArquivo.innerHTML = `${fileContent.name} - Mini Dev Editor`;
  }
  area.value = fileContent.content;
  numerarLinhas();
});

document.addEventListener("DOMContentLoaded", () => {
  area.addEventListener("keyup", () => {
    api.updateContent(area.value);
  });
});

area.addEventListener("scroll", () => {
  linha.scrollTop = area.scrollTop;
});
