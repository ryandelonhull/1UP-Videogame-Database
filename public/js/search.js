$(document).ready(function () {

    // game info modal
    var gameModal = $("#gameInfo");

    // display searched games
    $.get("/api/search").then(function (data) {
        // console.log("TESTING");
        // console.log(data.display)
        // console.log("year unix: ", parseInt(data.display[0].first_release_date));
        for (let i = 0; i < data.display.length; i++) {
            // unix timestap converter
            var ogdate = parseInt(data.display[i].first_release_date);
            var a = new Date(ogdate * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month + ' ' + year + ' ';
            var content = `
            <div class="item-${i + 1}">
            <figure class="has-text-centered">
            <div class="hero-body has-text-centered">
            <h1 class="title">${data.display[i].name}</h1>`;
            if (!data.display[i].rating) {
                var rating = `<h2 class="rating">User Rating Not Available</h2>`;
                content += rating;
            }else{
                var rating = `<h2 class="rating">User Rating: ${Math.floor(data.display[i].rating)}%</h2>`;
                content += rating;
            }if (!data.display[i].first_release_date) {
                var yearHtml = `<h3 class="year">Release Date Not Available</h3></br>`;
                content += yearHtml;
            }else{
                var yearHtml = `<h3 class="year">Release Date: ${time}</h3></br>`;
                content += yearHtml;
            }
            if (!data.display[i].cover) {
                var cover = `<img class="show" data-show="${i}" style="cursor: pointer" src="assets/1^dblogo.png" style="width:90px; height:90px;" alt="${data.display[i].name} cover image"/></br></br>`;
                content += cover;
            }else{
                var cover = `<img class="show" data-show="${i}" style="cursor: pointer" src="${data.display[i].cover.url}" alt="${data.display[i].name} cover image"/></br></br>`;
                content += cover;
            }
            content += `<button class="favorite button is-info is-outlined is-rounded" data-id=${i}>Favorite</button>
            </div></figure></div>`;
            $("#gamesContainer").append(content);

            $(".show").on("click", function (event) {
                event.preventDefault();
                console.log("testing");
                var id = $(this).attr("data-show");
                gameModal.attr("style", "display: block");
                $("#title").text(`Title: ${data.display[id].name}`);
                if (data.display[id].rating) {
                  $("#rating").text(`User Rating: ${Math.floor(data.display[id].rating)}%`);
                }
                if (data.display[id].cover.url) {
                  $("#cover").attr("src", data.display[id].cover.url);
                }
                if (data.display[id].summary) {
                  $("#summary").text(`Summary: ${data.display[id].summary}`);
                }
                if (data.display[id].storyline) {
                  $("#storyline").text(`Story Line: ${data.display[id].storyline}`);
                }
              });
              $(".close").on("click", function (event) {
                event.preventDefault();
                $("#gameInfo").attr("style", "display: none");
              });
        }

        // favorite game
        $(".favorite").on("click", function (event) {
            event.preventDefault();
            // console.log(this);
            var id = $(this).attr("data-id");
            $.post("/favorite", {
                game: data.display[id]
            });
        });
    });

    // searchbar on search page function
    $(".search").on("click", function (event) {
        event.preventDefault();
        var search = $(".searchbar").val();
        if (search) {
            $.post("/search", {
                search: search
            }).then(function () {
                location.reload();
            });
        }
    });

    // add friends
    $("#friend").on("click", function (event) {
        event.preventDefault();
        var email = $("#emailInput").val();
        $.post("/api/addfriend", { email: email }).then(function (data) {
        //   console.log("addfriend response 1: ", data);
        }).then(function(){
          location.reload();
        });
      });

});