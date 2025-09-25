document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('txtArea') as HTMLTextAreaElement
  area.focus()

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

  window.api.setColorText((color) => {
    area.style.color = `var(--${color})`
  })

  window.api.setFont((font) => {
    document.body.style.fontFamily = font
    area.style.fontFamily = font
  })

  area.addEventListener('keyup', () => {
    window.api.updateContent(area.value)
  })

  area.addEventListener('scroll', () => {
    linha.scrollTop = area.scrollTop
  })

  window.api.setFile(() => {
    numerarLinhas()
  })
})
