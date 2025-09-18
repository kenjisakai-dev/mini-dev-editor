document.addEventListener("DOMContentLoaded", () => {
  api.setTheme((_event, theme) => {
    const htmlRoot = document.documentElement;
    htmlRoot.classList.toggle("light", theme === "solarized");
  });
});
