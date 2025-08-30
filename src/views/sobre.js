document.addEventListener("DOMContentLoaded", () => {
  api.setTheme((_event, theme) => {
    const htmlRoot = document.documentElement;

    if (theme === "light") {
      htmlRoot.classList.add("light");
    } else {
      htmlRoot.classList.remove("light");
    }
  });
});
