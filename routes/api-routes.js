// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const axios = require("axios");
var games = "";
var token = "";
var cover = "";
// var getToken = "./authorization.js";
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    //   token = getToken();
    //   // console.log(scripts.getToken());
    //   db.User.update({ access: token },
    //     {
    //       where: {
    //         id: req.user.dataValues.id
    //       }
    //     }
    //   );
    //   res.json(req.user);
    // });
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
        console.log("user", req.user.dataValues);
        db.User.update({ access: token },
          {
            where: {
              id: req.user.dataValues.id
            }
          }
        );
        res.json(req.user);

      }).catch(function (err) {
        console.log(err);
      });

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday
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
      db.Games.findAll({ where: { userId: req.user.id } })
        .then(function (display) {
          console.log("all games: ", display);
          res.json({
            display: display,
            email: req.user.email
          });
        });

      // test axios call
      // GAME CODE START
      // games = await axios({
      //   url: "https://api.igdb.com/v4/games",
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
      // })
      //   .then(response => {
      //     // console.log(response.data);
      //     games = response.data;
      //     // console.log("games", games);
      //     return games;
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
      // console.log("games test2", games);
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // res.json({
      //   email: req.user.email,
      //   id: req.user.id,
      //   display: JSON.stringify(games)
      // });
    }
  });
  // final url url: `https://api.igdb.com/v4/games/?search=${req.body.search}&fields=id,name,collection,genres,cover.url,first_release_date,rating,slug,storyline,summary`,

  // working url "https://api.igdb.com/v4/games/?search=" + req.body.search,

  // search function - grabs all data requested
  app.post("/search", async function (req, res) {
    console.log("START OF SEARCH");
    console.log("search = ", req.body.search);
    games = await axios({
      url: `https://api.igdb.com/v4/games/?search=${req.body.search}&fields=id,name,collection,genres,cover.url,first_release_date,rating,slug,storyline,summary`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
        'Authorization': `Bearer ${token}`,
      },
      // data: "fields= *;"
      //  name, game, company;"
    })
      .then(response => {
        console.log("first search responses ", response.data);
        games = response.data;
        console.log("first id", games[0].cover);
        console.log("games NEW", games);
        return games;
      })
      .catch(err => {
        console.error(err);
      });
    // console.log("trimmed game ", games[0].name.split(" ").join(""));
    // var gameCover = covers(games[0].cover);
    // console.log(gameCover);
    // console.log("games test s0.earch", games);
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      // pass data email/id
      games: JSON.stringify(games)
    });
  });

  // displays games on search page
  app.get("/api/search", async function (req, res) {
    // var final = JSON.parse(games);
    console.log("games value = ", games);
    res.json({
      display: games
    });
  });

  app.get("/api/display", async function (req, res) {
    db.Games.findAll({ where: { id: req.user.id } })
      .then(function (display) {
        console.log("all games: ", display);
      })
    res.json({
      display: games
    });
  });


  app.post("/api/addfriend", function (req, res) {
    console.log(req.user.id);
    console.log("User addding: ", req.user);
    db.User.findOne({
      // grab email from modal
      where: { email: req.body.email }
    }).then(function (friend) {
      console.log("friend: ", friend);
      console.log("friend email: ", friend.dataValues.email);
      //   if (!user) { res.status(406).send("User not found") }
      //   // create error on front end
      db.Friends.create({
        userId: req.user.id,
        email: friend.dataValues.email,
        friend_id: friend.dataValues.id
      });
      console.log("Second create");
      db.Friends.create({
        userId: friend.dataValues.id,
        email: req.user.email,
        friend_id: req.user.id

      });
      if(friend.dataValues.email){
        res.status(201).send("success!");
      }
    });
    
  });

  app.post("/favorite", function (req, res) {
    console.log("user", req.user);
    console.log("game on backend", req.body.game);
    var game = req.body.game;
    var rating = Math.floor(game.rating);
    console.log("rating", rating);

    var ogdate = game.first_release_date;
    console.log("ogdate: ", ogdate);
    var a = new Date(ogdate * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var final = date + ' ' + month + ' ' + year + ' ';
    console.log("release date", final);
    db.Games.create({
      userId: req.user.id,
      name: game.name,
      cover_url: game.cover.url,
      user_rating: rating,
      year: final,
      storyline: game.storyline,
      summary: game.summary
    }).then(function (data) {
      console.log("returned data: ", data);
      if (!data) { res.status(406).send("Connection Issue") }
      else {
        res.status(201).send("Success!");
      }

    });

  });


  // function not necessary
  // working url url: `https://api.igdb.com/v4/covers/?game=${x}&fields=url,game`,
  function covers(x) {
    console.log("cover x=", x);
    axios({
      url: `https://api.igdb.com/v4/covers/?search=${x}&fields=url,game`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
        'Authorization': `Bearer ${token}`,
      },
      // data: `fields url.*;`
      //  name, game, company;"
    })
      .then(response => {
        console.log("covers response", response);
        cover = response.data;
        console.log("games cover search", cover);
        // return cover;
      })
      .catch(err => {
        console.error(err);
      });
    // begin second axios call for cover
    return cover;
  }

  // url: `https://api.igdb.com/v4/covers/?game=${x}`,

};