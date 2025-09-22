document.addEventListener('DOMContentLoaded', () => {
  window.api.setTheme((theme) => {
    const htmlRoot = document.documentElement
    htmlRoot.classList.toggle('light', theme === 'light')
  })
})
