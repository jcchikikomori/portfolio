/** main */
window.onload = function() {
  // document.getElementById("#loading-dialog").showModal();
  // $("#main-container").removeAttr("hidden");
  // $("#loading-button").trigger("click");

  // DARK MODE ==============================================

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    $("body").css("background", "#212529");
    $(".nes-container").each(function(i, obj) {
      $(this).addClass("is-dark");
      $("#profile-logo").attr("src", "img/jcc_logo_w.png");
    });
  } else {
    // normal
    $("body").css("background", "#FFF");
    $(".nes-container").each(function(i, obj) {
      $(this).removeClass("is-dark");
      $("#profile-logo").attr("src", "img/jcc_logo.png");
    });
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", e => {
      const newColorScheme = e.matches ? "dark" : "light";
      if (newColorScheme == "dark") {
        $("body").css("background", "#212529");
        $(".nes-container").each(function(i, obj) {
          $(this).addClass("is-dark");
          $("#profile-logo").attr("src", "img/jcc_logo_w.png");
        });
      } else {
        $("body").css("background", "#FFF");
        $(".nes-container").each(function(i, obj) {
          $(this).removeClass("is-dark");
          $("#profile-logo").attr("src", "img/jcc_logo.png");
        });
      }
    });

  // DARK MODE END ==============================================

  /**
   * Micro Client processor
   */
  const microProcessor = {
    init: function() {
      return $.ajax({
        url: "https://jcc-portfolio-api.herokuapp.com/graphql",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify({
          query: `{
                  allPost {
                    id
                    title
                    description
                    createdAt
                  }
                }`
        }),
        timeout: 5000,
        success: function(result) {
          let data = result.data; // get data from graphql
          let post = data.allPost; // query name
          // console.log(post.length);
          let li = "";
          for (let i = 0; i < post.length; i++) {
            p = post[i];
            li +=
              '<div id="post-' +
              p.id +
              '" class="post-list is-centered">' +
              '<p class="post-title">' +
              p.title +
              "</p>" +
              '<p class="post-sentence">' +
              p.description +
              "</p>" +
              "</div>";
          }
          if (post.length > 0) {
            $("#all-post").html(li);
            $("#update-container").show();
          } else {
            $("#all-post")
              .parent()
              .hide();
          }
          console.log("done loading posts..");

          // finish
          microProcessor.finishSetup();
        },
        error: function() {
          $("#all-post").html("");
          $("#all-post")
            .parent()
            .hide();

          console.log("error loading posts..");

          // render anyway
          $("#main-container").removeAttr("hidden");
          microProcessor.finishSetup();
        }
      });
    },
    finishSetup: function() {
      // $('#loading-dialog').hide();
      $("#loader-container").hide();
      $("#profile-container").show();
    }
  };

  // set
  microUpdates = microProcessor;

  /**
      if ($('.too-small-warning').is(':hidden')) {
        $('#profile-container').show();
      } else {
        $('#profile-container').show();
      }
      */

  if ($("#profile-container").is(":hidden")) {
    // load posts first
    $("#loading-message").text("Load shenanigans...");
    // load updates
    microUpdates.init();
  }
};

function goToUrl(url, includeTarget = true) {
  //eslint-disable-line no-unused-vars
  $("#redirect").attr("href", url);
  if (!includeTarget) {
    $("#redirect").attr("target", null);
  } else {
    $("#redirect").attr("target", "_blank");
  }
  $("#redirect")[0].click();
}
