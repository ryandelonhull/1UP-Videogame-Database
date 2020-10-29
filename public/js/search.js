$(document).ready(function () {
    $.get("/api/search").then(function (data) {
        console.log("TESTING");
        $(".games").text(data.display);
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


});