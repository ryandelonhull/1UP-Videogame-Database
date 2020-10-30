$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    $(".games").text(data.display);
  });

  if($(".gameCarousel").text("")){
    $(".gameCarousel").text("No Favorite Games");
  }
  
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

  bulmaCarousel.attach('#post_images', {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
  });
  

});
