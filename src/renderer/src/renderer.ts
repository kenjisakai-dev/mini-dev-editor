document.addEventListener('DOMContentLoaded', () => {
  // Foco no textarea
  const area = document.getElementById('txtArea') as HTMLTextAreaElement
  area.focus()

  // Numeração de linhas
  const linha = document.getElementById('linhas') as HTMLDivElement
  numerarLinhas()

  function numerarLinhas() {
    let linhaNumerada = ''
    let listaLinhas = area.value.split('\n')

    for (let i = 1; i <= listaLinhas.length; i++) {
      linhaNumerada += i + '<br>'
    }

    linha.innerHTML = linhaNumerada
  }

  area.addEventListener('input', () => {
    numerarLinhas()
  })

  // Alterar cor do texto
  window.api.setColorText((color) => {
    area.style.color = `var(--${color})`
  })

  // Alterar tema
  window.api.setTheme((theme) => {
    const htmlRoot = document.documentElement
    htmlRoot.classList.toggle('light', theme === 'light')
  })

  // Alterar fonte
  window.api.setFont((font) => {
    document.body.style.fontFamily = font
    area.style.fontFamily = font
  })
})
