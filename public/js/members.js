$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var recommendedGame;
  var recId;
  $.get("/api/user_data").then(function (games) {
    $("#userName").text(games.email)
    console.log("TESTING");
    console.log("data: ", games);
    console.log("all games front end: ", games.display)
    for (let i = 0; i < games.display.length; i++) {
      var content = `
          <div class="item-${i + 1}">
          <figure class="has-text-centered">
          <div class="hero-body has-text-centered">
          <h1 class="title">${games.display[i].name}</h1>`
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
      content += `<img src="${games.display[i].cover_url}" alt="${games.display[i].name} cover image"/></br></br>
      <button class="recommend button is-info is-outlined is-rounded" data-id="${i}">Recommend</button>
      <button class="del button is-info is-outlined is-rounded" data-delete="${i}">Delete</button> 
      </div></figure></div>`;
      // dropdown menu test
      // content += ``
      $(".content").append(content);
      $(".recommend").on("click", function (event) {
        event.preventDefault();
        recoModal.attr("style", "display: block");
        console.log(this);
        recId = $(this).attr("data-id");
        recommendedGame = games.display[recId].id;
      });
      $(".delete").on("click", function (event) {
        event.preventDefault();
        console.log(this);
        var id = $(this).attr("data-delete");
        $.post("/api/delete", {
          game: games.display[id]
        });
      });
    }
  }).then(function () {
    $.get("/api/friends", function (data) {
      if (data) {
        console.log("data returned from friends", data);
        console.log("display friends frontend response", data.friends);
        for (var i = 0; i < data.friends.length; i++) {
          var div = $("<div>");
          div.text(`Email Address: ${data.friends[i].email}`);
          $("#friendsDisplay").append(div);
        }
      }
    });
  });

$("#selectFriend").on("click", function(event){
  event.preventDefault();
  var friendText = $("#friendEmail").val().trim();
  console.log(recId);
  $.post("/api/recommend", {
    gameId: recommendedGame,
    email: friendText
  }).then(function(){
    $("#response").text("Thank you!");
  });
});
  


  $(".logout").on("click", function (event) {
    event.preventDefault();
    $.get("/logout");
  })

  $(".search").on("click", function (event) {
    event.preventDefault();
    var search = $(".searchbar").val();
    $.post("/search", {
      search: search
    }).then(function () {
      window.location.replace("/search");
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  });

  $("#friend").on("click", function (event) {
    event.preventDefault();
    var email = $("#emailInput").val();
    $.post("/api/addfriend", { email: email }).then(function (data) {
      console.log("addfriend response 1: ", data);
    }).then(function(){
      location.reload();
    });
  });

  // modal popup
  var modal = $("#addFriend")
  modal.attr("style", "display: none");

  $("#modalText").on("click", function (event) {
    event.preventDefault()
    modal.attr("style", "display: block");
  });

  $("#close").on("click", function (event) {
    modal.attr("style", "display: none");
  });

  // recommend modal
  var recoModal = $("#recommend");
  recoModal.attr("style", "display: none");
  
  $("#closeRec").on("click", function (event) {
    recoModal.attr("style", "display: none");
  });

});
