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

document.addEventListener("DOMContentLoaded", async () => {
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

  window.addEventListener("resize", () => fitAddon.fit());

  terminal.prompt = () => {
    terminal.write("\r\n> ");
  };

  let key = "";
  let command = "";
  let commandIndex = 0;
  const keysIgnore = [
    "Tab",
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Insert",
    "PageUp",
    "PageDown",
  ];

  let historyCommands = await api.getHistoryCommands();
  let historyIndex = historyCommands.length;

  terminal.onKey((event) => {
    const ev = event.domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    key = ev.key;

    if (key === "Enter") enterCommand();
    else if (key === "Backspace") backspaceCommand();
    else if (key === "Delete") deleteCommand();
    else if (key === "ArrowUp") arrowUpCommand();
    else if (key === "ArrowDown") arrowDownCommand();
    else if (key === "ArrowLeft") arrowLeftCommand();
    else if (key === "ArrowRight") arrowRightCommand();
    else if (key === "Home") homeCommand();
    else if (key === "End") endCommand();
    else if (keysIgnore.includes(key)) return;
    else if (printable) writeCommand();
  });

  window.api.terminalOutput(
    (event, { finished, message, editorName, numericMessage }) => {
      if (editorName === "cmd.exe") {
        if (numericMessage === 0) message = "\r\n\r\n" + message;
        if (finished) message = "\r\n" + message;
      }

      if (editorName === "pwsh.exe") {
        if (numericMessage === 0) message = "\r\n" + message;
      }

      terminal.write(message);
      if (finished) {
        terminal.write("\r\n");
        terminal.prompt();
      }
    }
  );

  async function enterCommand() {
    window.api.terminalInput(command);
    await api.appendHistoryCommand(command);
    historyCommands = await api.getHistoryCommands();
    historyIndex = historyCommands.length;
    command = "";
    commandIndex = 0;
  }

  function backspaceCommand() {
    if (commandIndex > 0) {
      command =
        command.slice(0, commandIndex - 1) + command.slice(commandIndex);
      commandIndex--;
      terminal.write("\x1b[2K\r> " + command);
      terminal.write(`\x1b[${commandIndex + 3}G`);
    }
  }

  function deleteCommand() {
    if (commandIndex < command.length) {
      command =
        command.slice(0, commandIndex) + command.slice(commandIndex + 1);
      terminal.write("\x1b[2K\r> " + command);
      terminal.write(`\x1b[${commandIndex + 3}G`);
    }
  }

  function writeCommand() {
    command =
      command.slice(0, commandIndex) + key + command.slice(commandIndex);
    commandIndex++;
    terminal.write("\x1b[2K\r> " + command);
    terminal.write(`\x1b[${commandIndex + 3}G`);
  }

  function arrowUpCommand() {
    if (historyCommands.length > 0 && historyIndex > 0) {
      historyIndex--;
      command = historyCommands[historyIndex] || "";
      commandIndex = command.length;
      terminal.write("\x1b[2K\r> " + command);
      terminal.write(`\x1b[${commandIndex + 3}G`);
    }
  }

  function arrowDownCommand() {
    if (
      historyCommands.length > 0 &&
      historyIndex < historyCommands.length - 1
    ) {
      historyIndex++;
      command = historyCommands[historyIndex] || "";
      commandIndex = command.length;
      terminal.write(`\x1b[2K\r> ${command}`);
      terminal.write(`\x1b[${commandIndex + 3}G`);
    }
  }

  function arrowLeftCommand() {
    if (commandIndex > 0) {
      commandIndex--;
      terminal.write("\x1b[1D");
    }
  }

  function arrowRightCommand() {
    if (commandIndex < command.length) {
      commandIndex++;
      terminal.write("\x1b[1C");
    }
  }

  function homeCommand() {
    commandIndex = 0;
    terminal.write("\x1b[2K\r> " + command);
    terminal.write("\x1b[3G");
  }

  function endCommand() {
    commandIndex = command.length;
    terminal.write("\x1b[2K\r> " + command);
    terminal.write(`\x1b[${commandIndex + 3}G`);
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

  api.setEditorType((_event, { editorType, editorName }) => {
    if (editorType === "text") {
      document.getElementById("txtEditor").style.display = "block";
      document.getElementById("terminal").style.display = "none";
      document.getElementById("codeEditor").style.display = "none";
    } else if (editorType === "terminal") {
      document.getElementById("txtEditor").style.display = "none";
      document.getElementById("terminal").style.display = "block";
      document.getElementById("codeEditor").style.display = "none";
      command = "";
      terminal.clear();
      terminal.prompt();
    } else if (editorType === "code") {
      document.getElementById("txtEditor").style.display = "none";
      document.getElementById("terminal").style.display = "none";
      document.getElementById("codeEditor").style.display = "block";
      createCodeEditor();
    }
  });
});

function createCodeEditor() {
  let codeEditor = document.getElementById("codeEditor");

  var editor = CodeMirror(codeEditor, {
    // value:
    //   "// Digite seu código JavaScript aqui\nfunction hello() {\n  console.log('Olá, mundo!');\n}",
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
    autofocus: true,
    tabSize: 2,
    indentUnit: 2,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: false,
  });

  api.setThemeCode((_event, themeCode) => {
    editor.setOption("theme", themeCode);
  });

  editor.setSize("100%", "100%");

  codeEditor.addEventListener("keyup", () => {
    api.updateContent(editor.getValue());
  });

  api.setFile((_event, fileContent) => {
    if (fileContent.name === "") {
      nomeArquivo.innerHTML = `Mini Dev Editor`;
    } else {
      nomeArquivo.innerHTML = `${fileContent.name} - Mini Dev Editor`;
    }

    editor.setValue(fileContent.content);
    numerarLinhas();
  });
}
