$(document).ready(function () {

    $.get("/api/search").then(function (data) {
        $(".games").text(data.display);
    });

});