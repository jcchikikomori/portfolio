import $ from "jquery";

export const darkMode = () => {
  // const darkBgColor = "#212529";

  // $("body").css("background", darkBgColor);
  $("body").addClass("dark");
  $("#profile-logo").attr("src", "img/jcc_logo_w.png");
  $(".nes-container").each(function() {
    $(this).addClass("is-dark");
  });
  $(".nes-dialog").each(function() {
    $(this).addClass("is-dark");
  });
};
  
export const normalTheme = () => {
  // $("body").css("background", "#FFF");
  $("body").removeClass("dark");
  $("#profile-logo").attr("src", "img/jcc_logo.png");
  $(".nes-container").each(function() {
    $(this).removeClass("is-dark");
  });
  $(".nes-dialog").each(function() {
    $(this).removeClass("is-dark");
  });
};
  