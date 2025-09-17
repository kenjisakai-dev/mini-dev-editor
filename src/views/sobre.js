document.addEventListener("DOMContentLoaded", () => {
  window.api.setTheme((_event, theme) => {
    const htmlRoot = document.documentElement;
    htmlRoot.classList.toggle("light", theme === "light");
  });
});
