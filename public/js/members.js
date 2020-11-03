$(document).ready(function () {

  // initialize modal vars
  var recoModal = $("#recommend");
  var modal = $("#addFriend");
  var gameModal = $("#gameInfo");
  var profile = $("#editProfile");
  var recommendedGame;
  var recId;


  // hide modals
  modal.attr("style", "display: none");
  recoModal.attr("style", "display: none");
  profile.attr("style", "display: none");
  gameModal.attr("style", "display: none");

  // display recommended games
  $.get("/api/recommended").then(function (games) {
    // console.log("recommended games: ", games.display[0]);
    for (let i = 0; i < games.display.length; i++) {
      var reco = `
        <div>
        <figure class="has-text-centered">
        <div class="hero-body has-text-centered">
        <h1 class="title">${games.display[i].name}</h1>`;
      if (!games.display[i].user_rating) {
        reco += `<h2 class="rating">User Rating Not Available</h2>`;
      } else {
        reco += `<h2 class="rating">RATING: ${games.display[i].user_rating}%</h2>`;
      }
      if (!games.display[i].year) {
        reco += `<h3 class="year">Year Not Available</h3></br>`;
      } else {
        reco += `<h3 class="year">${games.display[i].year}</h3></br>`;
      }
      reco += `<img class="show" data-recShow="${i}" style="cursor: pointer" src="${games.display[i].cover_url}" alt="${games.display[i].name} cover image"/></br></br>
    <button class="delreco button is-info is-outlined is-rounded" data-delreco="${i}">Delete</button> 
    </div></figure></a>`;

      $(".recommended").append(reco);

      // delete recommendations
      $(".delreco").on("click", function (event) {
        // console.log("working");
        event.preventDefault();
        var id = $(this).attr("data-delreco");
        $.post("/api/deleteRec", {
          game: games.display[id],
        });
        location.reload();
      });
      $(".show").on("click", function (event) {
        event.preventDefault();
        // console.log("testing");
        var id = $(this).attr("data-recShow");
        gameModal.attr("style", "display: block");
        $("#title").text(`Title: ${games.display[id].name}`);
        if (!games.display[id].user_rating) {
          $("#rating").text("");
        } else {
          $("#rating").text(`User Rating: ${games.display[id].user_rating}%`);
        }
        if (games.display[id].year) {
          $("#year").text(`Release Date: ${games.display[id].year}`);
        }
        if (games.display[id].cover_url) {
          $("#cover").attr("src", games.display[id].cover_url);
          $("#cover").attr("style", "width:120px; height:120");
        }
        if (games.display[id].summary) {
          $("#summary").text(`Summary: ${games.display[id].summary}`);
        }
        if (games.display[id].storyline) {
          $("#storyline").text(`Story Line: ${games.display[id].storyline}`);
        }
      });
      $(".close").on("click", function (event) {
        event.preventDefault();
        $("#gameInfo").attr("style", "display: none");
      });
    }
  });

  // display favorited games
  $.get("/api/user_data")
    .then(function (games) {
      // console.log(games.display);
      $("#userName").text(`User: ${games.email}`);
      if (games.bio) {
        $(".subtitle").text(`Bio: ${games.bio}`)
      }
      if (games.image) {
        var proPic = `<img src=${games.image} alt="Profile Picture" style="height: 125px; width: 125px;"/>`;
        $("#profilePic").append(proPic);
      }
      // console.log("data: ", games);
      // console.log("all games front end: ", games.display);
      for (let i = 0; i < games.display.length; i++) {
        var content = `
          <div>
          <figure class="has-text-centered">
          <div class="hero-body has-text-centered">
          <h1 class="title">${games.display[i].name}</h1>`;
        if (!games.display[i].user_rating) {
          content += `<h2 class="rating">User Rating Not Available</h2>`;
        } else {
          content += `<h2 class="rating">RATING: ${games.display[i].user_rating}%</h2>`;
        }
        if (!games.display[i].year) {
          content += `<h3 class="year">Year Not Available</h3></br>`;
        } else {
          content += `<h3 class="year">${games.display[i].year}</h3></br>`;
        }
        content += `<img class="game" data-val="${i}" style="width:120px; height:120px; cursor: pointer" src="${games.display[i].cover_url}" alt="${games.display[i].name} cover image"/></br></br>
      <button class="recommend button is-info is-outlined is-rounded" data-id="${i}">Recommend</button>
      <button class="del button is-info is-outlined is-rounded" data-delete="${i}">Delete</button> 
      </div></figure></div>`;
        // dropdown menu test
        // content += ``
        $(".content").append(content);
        $(".recommend").on("click", function (event) {
          event.preventDefault();
          $("#friendEmail").val("");
          recoModal.attr("style", "display: block");
          $("#response").text("Add Friend Email: ");
          // console.log(this);
          recId = $(this).attr("data-id");
          recommendedGame = games.display[recId].id;
        });

        // delete favorited games
        $(".del").on("click", function (event) {
          // console.log("working");
          event.preventDefault();
          var id = $(this).attr("data-delete");
          $.post("/api/delete", {
            game: games.display[id],
          });
          location.reload();
        });
        $(".game").on("click", function (event) {
          event.preventDefault();
          // console.log("testing");
          var id = $(this).attr("data-val");
          gameModal.attr("style", "display: block");
          $("#title").text(`Title: ${games.display[id].name}`);
          if (games.display[id].user_rating) {
            $("#rating").text(`User Rating: ${games.display[id].user_rating}%`);
          }
          if (games.display[id].year) {
            $("#year").text(`Release Date: ${games.display[id].year}`);
          }
          if (games.display[id].cover_url) {
            $("#cover").attr("src", games.display[id].cover_url);
            $("#cover").attr("style", "width:120px; height:120");

          }
          if (games.display[id].summary) {
            $("#summary").text(`Summary: ${games.display[id].summary}`);
          }
          if (games.display[id].storyline) {
            $("#storyline").text(`Story Line: ${games.display[id].storyline}`);
          }
        });
        $(".close").on("click", function (event) {
          event.preventDefault();
          $("#rating").text("");
          $("#gameInfo").attr("style", "display: none");
        });
      }
    })
    .then(function () {
      $.get("/api/friends", function (data) {
        if (data) {
          // console.log("data returned from friends", data);
          // console.log("display friends frontend response", data.friends);
          for (var i = 0; i < data.friends.length; i++) {
            var div = $("<div>");
            div.text(`${data.friends[i].email}`);
            $("#friendsDisplay").append(div);
          }
        }
      });
    });

  // recommend game
  $("#selectFriend").on("click", function (event) {
    event.preventDefault();
    var friendText = $("#friendEmail").val().trim();
    // console.log(recId);
    $.post("/api/recommend", {
      gameId: recommendedGame,
      email: friendText,
    }).then(function () {
      $("#response").text("Thank you!");
    });
  });

  // logout
  $(".logout").on("click", function (event) {
    event.preventDefault();
    $.get("/logout");
  });

  // search
  $(".search").on("click", function (event) {
    event.preventDefault();
    var search = $(".searchbar").val();
    $.post("/search", {
      search: search,
    })
      .then(function () {
        window.location.replace("/search");
        // If there's an error, log the error
      });
  });

  // add friends
  $("#friend").on("click", function (event) {
    event.preventDefault();
    var email = $("#emailInput").val();
    $.post("/api/addfriend", { email: email })
      .then(function (data) {
        $("#add").text("Thank you!");
        // console.log("addfriend response 1: ", data);
      })
      .then(function () {
        location.reload();
      });
  });

  // open edit profile modal
  $("#edit").on("click", function (event) {
    event.preventDefault();
    profile.attr("style", "display: block");
  });

  $("#submit").on("click", function (event) {
    event.preventDefault();
    var bio = $("#bio").val().trim();
    var image = $("#image").val().trim();
    if (bio === "" && image === "") {
      return;
    }
    if (image !== "" && bio === "") {
      // console.log("just image sending")
      $.post("/api/editprofile", { image: image })
        .then(function () {
          $("#image").val("");
          location.reload();
        })
    }
    if (bio !== "" && image === "") {
      // console.log("just bio sending");
      $.post("/api/editprofile", { bio: bio })
        .then(function () {
          $("#bio").val("");
          location.reload();
        })
    }
    if (bio !== "" && image !== "") {
      // console.log("both sending");
      $.post("/api/editprofile", { bio: bio, image: image })
        .then(function () {
          $("#bio").val("");
          $("#image").val("");
          location.reload();
        })
    }
  });

  // display add friend modal
  $("#modalText").on("click", function (event) {
    event.preventDefault();
    modal.attr("style", "display: block");
  });

  // close modals
  $("#close").on("click", function (event) {
    modal.attr("style", "display: none");
  });

  $("#closeRec").on("click", function (event) {
    recoModal.attr("style", "display: none");
  });
  $("#closeEdit").on("click", function (event) {
    profile.attr("style", "display: none");
  });

  // close modals on screen click
  $(".video").on("click", function () {
    modal.attr("style", "display: none");
    recoModal.attr("style", "display: none");
    gameModal.attr("style", "display: none");
    profile.attr("style", "display: none");
  });

 
});


