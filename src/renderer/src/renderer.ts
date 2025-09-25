document.addEventListener('DOMContentLoaded', () => {
  const txtEditor = document.getElementById('txtEditor') as HTMLDivElement
  const codeEditor = document.getElementById('codeEditor') as HTMLDivElement

  window.api.setEditor(({ type }) => {
    if (type === 'code') {
      txtEditor.style.display = 'none'
      codeEditor.style.display = 'block'
    }

    if (type === 'text') {
      txtEditor.style.display = 'block'
      codeEditor.style.display = 'none'
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
