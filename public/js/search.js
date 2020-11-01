$(document).ready(function () {
    $.get("/api/search").then(function (data) {
        console.log("TESTING");
        console.log(data.display)
        // console.log("year unix: ", parseInt(data.display[0].first_release_date));
        for (let i = 0; i < data.display.length; i++) {

            var ogdate = parseInt(data.display[i].first_release_date);
            var a = new Date(ogdate * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month + ' ' + year + ' ';
            // + hour + ':' + min + ':' + sec 
            // console.log("cover url: ", data.display[i].cover.url);
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
                var cover = `<img src="assets/1^dblogo.png" style="width:90px; height:90px;" alt="${data.display[i].name} cover image"/></br></br>`;
                content += cover;
            }else{
                var cover = `<img src="${data.display[i].cover.url}" alt="${data.display[i].name} cover image"/></br></br>`;
                content += cover;
            }
            content += `<button class="favorite button is-info is-outlined is-rounded" data-id=${i}>Favorite</button>
            </div></figure></div>`;
            $("#gamesContainer").append(content);

        }
        // create event listener for card in carousel -load info from data id
        // add cursor-pointer when hovering over card

        $(".favorite").on("click", function (event) {
            event.preventDefault();
            console.log(this);
            var id = $(this).attr("data-id");
            $.post("/favorite", {
                game: data.display[id]
            });
        });
    }).then(function (data) {
        console.log("search data: ", data);
    });

    // searchbar on search page function
    $(".search").on("click", function (event) {
        event.preventDefault();
        var search = $(".searchbar").val();
        if (search) {
            $.post("/search", {
                search: search
            }).then(function (data) {
                console.log("search returned data: ", data);
                location.reload();
            }).catch(function (err) {
                console.log(err);
            });
        }
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

});