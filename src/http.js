import $ from "jquery";

/**
 * Micro Client processor
 */
export const microProcessor = {
  init: function () {
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
      success: function (result) {
        let data = result.data; // get data from graphql
        let post = data.allPost; // query name
        // console.log(post.length);
        let li = "";
        for (let i = 0; i < post.length; i++) {
          let p = post[i];
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
      error: function () {
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
  finishSetup: function () {
    // $('#loading-dialog').hide();
    $("#loader-container").hide();
    $("#profile-container").show();
  }
};
