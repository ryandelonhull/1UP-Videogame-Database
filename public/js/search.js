$(document).ready(function () {
    $.get("/api/search").then(function (data) {
        console.log("TESTING");
        // console.log(data.display[0].cover)
        for (let i = 0; i < data.display.length; i++) {
            var content = `<img class="is-background" src="${data.display[i].cover}" alt="${data.display[i].title} cover image"/>
            <div class="hero-body has-text-centered is-overlay">
              <h1 class="title">${data.display[i].title}</h1>
              <h2 class="rating">RATING: ${data.display[i].rating}</h2>
              <h3 class="year">${data.display[i].year}</h3>
              <button data-id=${data.display.id}>Favorite</button>`;

            $(".carousel").append(content);
            
            // create event listener for card in carousel -load info from data id
            // add cursor-pointer when hovering over card

            //     var content = `<img class="is-background" src="${data.display[i].cover}"/>
            //     <div class="hero-body has-text-centered is-overlay">
            //       <h1 class="title">${data.display[i].title}</h1>
            //       <h2 class="rating">PG-13</h2>
            //       <h3 class="year">2020</h3>`

            //     var newCard = $("<p>");
            //     // newCard.setAttribute("href", data.display[i].cover)
            //     // newCard.text(JSON.stringify(data.display[i]));
            //     $(".games").append(content);
            // }
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