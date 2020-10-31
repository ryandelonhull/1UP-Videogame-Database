$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (games) {
    $(".title").text(games.email)
    console.log("TESTING");
    console.log("data: ", games);
    console.log("all games front end: ", games.display)
    for (let i = 0; i < games.display.length; i++) {
      var content = `
          <div class="item-${i + 1}">
          <figure class="has-text-centered">
          <div class="hero-body has-text-centered">
          <h1 class="title">${games.display[i].name}</h1>
          <h2 class="rating">RATING: ${games.display[i].user_rating}%</h2>
          <h3 class="year">${games.display[i].year}</h3></br>
          <img src="${games.display[i].cover_url}" alt="${games.display[i].name} cover image"/></br></br>
          </div></figure></div>`;
      $(".container").append(content);
    }
  });
 
  $(".logout").on("click", function(event){
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
    })
  });


  bulmaCarousel.attach('#post_images', {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
  });


});
