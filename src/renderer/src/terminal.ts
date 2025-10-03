document.addEventListener('DOMContentLoaded', async () => {
  const terminal = new window.Terminal({
    fontSize: 16,
    lineHeight: 1,
    fontFamily: 'JetBrains Mono',
    theme: {
      background: '#1e1e1e',
      foreground: '#d6d6d6',
      cursor: '#b3fbfaff',
      selection: '#333',
      black: '#000000',
      red: '#ff0000',
      green: '#00ff00',
      yellow: '#ffff00',
      blue: '#0000ff',
      magenta: '#ff00ff',
      cyan: '#00ffff',
      white: '#ffffff',
      brightBlack: '#808080',
      brightRed: '#ff8080',
      brightGreen: '#80ff80',
      brightYellow: '#ffff80',
      brightBlue: '#8080ff',
      brightMagenta: '#ff80ff',
      brightCyan: '#80ffff',
      brightWhite: '#ffffff'
    }
  })
  terminal.open(document.getElementById('terminal'))

  const fitAddon = new window.FitAddon.FitAddon()
  terminal.loadAddon(fitAddon)
  
  // Função para ajustar o terminal
  const fitTerminal = () => {
    const terminalElement = document.getElementById('terminal')
    if (terminalElement && terminalElement.style.display !== 'none') {
      try {
        fitAddon.fit()
      } catch (error) {
        console.warn('Erro ao ajustar terminal:', error)
      }
    }
  }
  
  fitAddon.fit()

  window.addEventListener('resize', () => {
    setTimeout(fitTerminal, 50)
  })

  terminal.prompt = () => {
    terminal.write('\r\n> ')
  }

  let key = ''
  let command = ''
  let commandIndex = 0
  const keysIgnore = [
    'Tab',
    'Escape',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'Insert',
    'PageUp',
    'PageDown'
  ]

  let historyCommands = await window.api.getHistoryCommands()
  let historyIndex = historyCommands.length

  terminal.onKey((event) => {
    const ev = event.domEvent
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey
    key = ev.key

    if (key === 'Enter') enterCommand()
    else if (key === 'Backspace') backspaceCommand()
    else if (key === 'Delete') deleteCommand()
    else if (key === 'ArrowUp') arrowUpCommand()
    else if (key === 'ArrowDown') arrowDownCommand()
    else if (key === 'ArrowLeft') arrowLeftCommand()
    else if (key === 'ArrowRight') arrowRightCommand()
    else if (key === 'Home') homeCommand()
    else if (key === 'End') endCommand()
    else if (keysIgnore.includes(key)) return
    else if (printable) writeCommand()
  })

  async function enterCommand() {
    window.api.terminalInput(command)
    await window.api.appendHistoryCommand(command)
    historyCommands = await window.api.getHistoryCommands()
    historyIndex = historyCommands.length
    command = ''
    commandIndex = 0
  }

  function backspaceCommand() {
    if (commandIndex > 0) {
      command = command.slice(0, commandIndex - 1) + command.slice(commandIndex)
      commandIndex--
      terminal.write('\x1b[2K\r> ' + command)
      terminal.write(`\x1b[${commandIndex + 3}G`)
    }
  }

  function deleteCommand() {
    if (commandIndex < command.length) {
      command = command.slice(0, commandIndex) + command.slice(commandIndex + 1)
      terminal.write('\x1b[2K\r> ' + command)
      terminal.write(`\x1b[${commandIndex + 3}G`)
    }
  }

  function writeCommand() {
    command = command.slice(0, commandIndex) + key + command.slice(commandIndex)
    commandIndex++
    terminal.write('\x1b[2K\r> ' + command)
    terminal.write(`\x1b[${commandIndex + 3}G`)
  }

  function arrowUpCommand() {
    if (historyCommands.length > 0 && historyIndex > 0) {
      historyIndex--
      command = historyCommands[historyIndex] || ''
      commandIndex = command.length
      terminal.write('\x1b[2K\r> ' + command)
      terminal.write(`\x1b[${commandIndex + 3}G`)
    }
  }

  function arrowDownCommand() {
    if (historyCommands.length > 0 && historyIndex < historyCommands.length - 1) {
      historyIndex++
      command = historyCommands[historyIndex] || ''
      commandIndex = command.length
      terminal.write(`\x1b[2K\r> ${command}`)
      terminal.write(`\x1b[${commandIndex + 3}G`)
    }
  }

  function arrowLeftCommand() {
    if (commandIndex > 0) {
      commandIndex--
      terminal.write('\x1b[1D')
    }
  }

  function arrowRightCommand() {
    if (commandIndex < command.length) {
      commandIndex++
      terminal.write('\x1b[1C')
    }
  }

  function homeCommand() {
    commandIndex = 0
    terminal.write('\x1b[2K\r> ' + command)
    terminal.write('\x1b[3G')
  }

  function endCommand() {
    commandIndex = command.length
    terminal.write('\x1b[2K\r> ' + command)
    terminal.write(`\x1b[${commandIndex + 3}G`)
  }

  window.api.terminalOutput(({ finished, message, editorName, numericMessage }) => {
    if (editorName === 'cmd.exe') {
      if (numericMessage === 0) message = '\r\n\r\n' + message
      if (finished) message = '\r\n' + message
    }

    if (editorName === 'pwsh.exe') {
      if (numericMessage === 0) message = '\r\n' + message
    }

    terminal.write(message)
    if (finished) {
      terminal.write('\r\n')
      terminal.prompt()
    }
  })

  window.api.setColorText((color) => {
    const cor = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`).trim()

    terminal.options.theme = {
      ...terminal.options.theme,
      foreground: cor
    }
  })

  window.api.setTheme(() => {
    const cor = getComputedStyle(document.documentElement).getPropertyValue(`--background`).trim()

    terminal.options.theme = {
      ...terminal.options.theme,
      background: cor
    }
  })

  window.api.setEditor(({ type }) => {
    if (type === 'terminal') {
      const txtEditor = document.getElementById('txtEditor')
      const terminalDiv = document.getElementById('terminal')
      const codeEditor = document.getElementById('codeEditor')
      
      if (txtEditor) txtEditor.style.display = 'none'
      if (codeEditor) codeEditor.style.display = 'none'
      if (terminalDiv) {
        terminalDiv.style.display = 'block'
        // Ajustar terminal após torná-lo visível
        setTimeout(fitTerminal, 10)
        setTimeout(fitTerminal, 100)
      }
      
      command = ''
      terminal.clear()
      terminal.prompt()
    }
  })
})
