$(document).ready(function () {

    $.get("/api/search").then(function (data) {
        $(".games").text(data.display);
    });

    bulmaCarousel.attach('#post_images', {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
      });
      

});

  