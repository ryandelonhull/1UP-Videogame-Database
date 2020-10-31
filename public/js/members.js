$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    $(".games").text(data.display);
  });

  if ($(".gameCarousel").text("")) {
    $(".gameCarousel").text("No Favorite Games");
  }
  $.get("/api/display").then(function (data) {
    console.log("TESTING");
    console.log(data.display)
    // console.log("year unix: ", parseInt(data.display[0].first_release_date));
    // for (let i = 0; i < data.display.length; i++) {

    //     var ogdate = parseInt(data.display[i].first_release_date);
    //     var a = new Date(ogdate * 1000);
    //     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //     var year = a.getFullYear();
    //     var month = months[a.getMonth()];
    //     var date = a.getDate();
    //     var time = date + ' ' + month + ' ' + year + ' ';
    //     // + hour + ':' + min + ':' + sec 
    //     var content = `
    //     <div class="item-${i + 1}">
    //     <figure class="has-text-centered">
    //     <div class="hero-body has-text-centered">
    //     <h1 class="title">${data.display[i].name}</h1>
    //     <h2 class="rating">RATING: ${Math.floor(data.display[i].rating)}%</h2>
    //     <h3 class="year">${time}</h3></br>
    //     <img src="${data.display[i].cover.url}" alt="${data.display[i].name} cover image"/></br></br>
    //     <button class="favorite button is-info is-outlined is-rounded" data-id=${i}>Favorite</button>
    //     </div></figure></div>`;
    //     $(".carousel").append(content);

    // }
    // create event listener for card in carousel -load info from data id
    // add cursor-pointer when hovering over card

    $(".favorite").on("click", function (event) {
        event.preventDefault();
        console.log(this);
        var id = $(this).attr("data-id");
        console.log(id);
        $.post("/favorite", {
            game: data.display[id]
        }).then(function (data) {
            console.log("returned data: ", data);
        });
    });
});
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

    })
  });


  bulmaCarousel.attach('#post_images', {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
  });


});
