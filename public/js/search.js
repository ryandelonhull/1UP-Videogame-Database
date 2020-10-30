$(document).ready(function () {
    $.get("/api/search").then(function (data) {
        console.log("TESTING");
        for(let i = 0; i<data.display.length; i++){
            var newCard = $("<p>");
            newCard.text(JSON.stringify(data.display[i]));
            $(".games").append(newCard);
        }
        // $(".games").text(data.display);
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

    bulmaCarousel.attach('#post_images', {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
      });
      

});

  
