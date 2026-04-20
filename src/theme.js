export const darkMode = () => {
  document.body.classList.add("dark");
  document.getElementById("profile-logo").setAttribute("src", "img/jcc_logo_w.png");
  document.querySelectorAll(".nes-container").forEach(el => el.classList.add("is-dark"));
  document.querySelectorAll(".nes-dialog").forEach(el => el.classList.add("is-dark"));
};

export const normalTheme = () => {
  document.body.classList.remove("dark");
  document.getElementById("profile-logo").setAttribute("src", "img/jcc_logo.png");
  document.querySelectorAll(".nes-container").forEach(el => el.classList.remove("is-dark"));
  document.querySelectorAll(".nes-dialog").forEach(el => el.classList.remove("is-dark"));
};
  