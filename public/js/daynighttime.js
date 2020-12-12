if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // dark mode
  $("body").css("background", "#23272a");
} else {
  // normal
  $("body").css("background", "#FFF");
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", e => {
    const newColorScheme = e.matches ? "dark" : "light";
    if (newColorScheme == "dark") {
      $("body").css("background", "#23272a");
    } else {
      $("body").css("background", "#FFF");
    }
  });
