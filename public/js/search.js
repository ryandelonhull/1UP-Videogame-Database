$(document).ready(function () {

    $.get("/api/search").then(function (data) {
       console.log("TESTING");
        $(".games").text(data.display);
    });

});