document.addEventListener('DOMContentLoaded', () => {
  const txtEditor = document.getElementById('txtEditor') as HTMLDivElement
  const codeEditor = document.getElementById('codeEditor') as HTMLDivElement
  const terminal = document.getElementById('terminal') as HTMLDivElement

  window.api.setEditor(({ type }) => {
    if (type === 'text') {
      txtEditor.style.display = 'block'
      codeEditor.style.display = 'none'
      terminal.style.display = 'none'
    }

    if (type === 'code') {
      txtEditor.style.display = 'none'
      codeEditor.style.display = 'block'
      terminal.style.display = 'none'
    }

    if (type === 'terminal') {
      txtEditor.style.display = 'none'
      codeEditor.style.display = 'none'
      terminal.style.display = 'block'
    }
  })

  window.api.setTheme((theme) => {
    const htmlRoot = document.documentElement
    htmlRoot.classList.toggle('light', theme === 'light')
  })

  window.api.setFile(({ name, content }) => {
    const title = document.querySelector('title') as HTMLTitleElement
    const area = document.getElementById('txtArea') as HTMLTextAreaElement

    if (name === '') {
      title.innerHTML = `Mini Dev Editor`
    } else {
      title.innerHTML = `${name} - Mini Dev Editor`
    }

    area.value = content
  })
})
