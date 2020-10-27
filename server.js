var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars setup
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// link to routes
var routes = require("../Videogame-Database/controllers/vg-controller");
app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
