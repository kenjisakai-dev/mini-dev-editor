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

api.setFont((_event, font) => {
  document.body.style.fontFamily = font;
  area.style.fontFamily = font;
});

document.addEventListener("DOMContentLoaded", () => {
  console.log(window.Terminal);
  console.log(window.Terminal.prototype);
  const terminal = new window.Terminal({
    fontSize: 16,
    lineHeight: 1,
    fontFamily: "JetBrains Mono",
    theme: {
      background: "#1e1e1e",
      foreground: "#d6d6d6",
      cursor: "#b3fbfaff",
      selection: "#333",
      black: "#000000",
      red: "#ff0000",
      green: "#00ff00",
      yellow: "#ffff00",
      blue: "#0000ff",
      magenta: "#ff00ff",
      cyan: "#00ffff",
      white: "#ffffff",
      brightBlack: "#808080",
      brightRed: "#ff8080",
      brightGreen: "#80ff80",
      brightYellow: "#ffff80",
      brightBlue: "#8080ff",
      brightMagenta: "#ff80ff",
      brightCyan: "#80ffff",
      brightWhite: "#ffffff",
    },
  });
  terminal.open(document.getElementById("terminal"));

  const fitAddon = new window.FitAddon.FitAddon();
  terminal.loadAddon(fitAddon);
  fitAddon.fit();

  terminal.prompt = () => {
    terminal.write("\r\n> ");
  };
  terminal.prompt();

  let key = "";
  let command = "";

  terminal.onKey((event) => {
    const ev = event.domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    key = ev.key;

    if (key === "Enter") enterCommand();
    else if (key === "Backspace") backspaceCommand();
    else if (printable) writeCommand();
  });

  window.api.terminalOutput((event, { finished, message }) => {
    terminal.write(message);
    if (finished) {
      terminal.write("\r\n");
      terminal.prompt();
    }
  });

  function enterCommand() {
    window.api.terminalInput(command);
    terminal.write("\r\n");
    command = "";
  }

  function backspaceCommand() {
    terminal.write("\b \b");
    command = command.slice(0, -1);
  }

  function writeCommand() {
    command += key;
    terminal.write(key);
  }

  api.setColor((_event, color) => {
    const cor = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${color}`)
      .trim();
    terminal.options.theme = {
      ...terminal.options.theme,
      foreground: cor,
    };
  });

  api.setTheme((_event, theme) => {
    const cor = getComputedStyle(document.documentElement)
      .getPropertyValue(`--fundo`)
      .trim();
    terminal.options.theme = {
      ...terminal.options.theme,
      background: cor,
    };
  });
});

api.setEditorType((_event, editorType) => {
  if (editorType === "text") {
    document.getElementById("txtEditor").style.display = "block";
    document.getElementById("terminal").style.display = "none";
  } else if (editorType === "terminal") {
    document.getElementById("txtEditor").style.display = "none";
    document.getElementById("terminal").style.display = "block";
  }
});
