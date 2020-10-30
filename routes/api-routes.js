// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const axios = require("axios");
var games = "";
var token = "";
var search = "";
const access = require("./authorization");
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), async function (req, res) {
    
    axios.post("https://id.twitch.tv/oauth2/token?client_id=qh6jfouob87senzmm6422jomq4ui44&client_secret=83qdp141qoaog5ybcmwpr4z7u6wj4y&grant_type=client_credentials")
    .then(function (response) {
        console.log("response in auth func", response.data.access_token);
        token = response.data.access_token;
        console.log("token in auth function", token);

    }, function (err) {
        console.log(err);
    })
      .then(function () {
        console.log("token login", token);
        // sessionStorage.setItem('access', token);
        // var test = sessionStorage.getItem('access');
        // console.log("access token from storage", test);
        console.log("user", req.user.dataValues);
        db.User.update({access : token},
          {
          where:{
            id: req.user.dataValues.id
          }
        }
        );
        res.json(req.user);
        
      }).catch(function(err){
        console.log(err);
      });

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        // redirect to login page
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        // throw error status 401
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", async function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // GAME CODE START
      games = await axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
          'Authorization': `Bearer ${token}`,
        },
        data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
      })
        .then(response => {
          // console.log(response.data);
          games = response.data;
          // console.log("games", games);
          return games;
        })
        .catch(err => {
          console.error(err);
        });
      // console.log("games test2", games);
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        display: JSON.stringify(games)
      });
    }
  });

  app.post("/search", async function (req, res) {
  console.log("START OF SEARCH");
    console.log("search= ", req.body.search);
    games = await axios({
      url: "https://api.igdb.com/v4/games/?search=" + req.body.search,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
        'Authorization': `Bearer ${token}`,
      },
      data: "fields *;"
      //  name, game, company;"
    })
      .then(response => {
        console.log(response.data);
        games = response.data;
        console.log("games NEW", games);
        return games;
      })
      .catch(err => {
        console.error(err);
      });
    console.log("games test search", games);
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      // pass data email/id
      games: games
    });
  });

  app.get("/api/search", async function (req, res) {
    covers = await axios({
      url: "https://api.igdb.com/v4/covers/?search=" + games,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
        'Authorization': `Bearer ${token}`,
      },
      data: "fields *;"
      //  name, game, company;"
    })
      .then(response => {
        console.log(response.data);
        games = response.data;
        console.log("games NEW", games);
        return games;
      })
      .catch(err => {
        console.error(err);
      });

    res.json({    
      display: JSON.stringify(games)
    });
  });
};
