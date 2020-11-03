const axios = require("axios");
// var token = "";
function getToken() {
        axios.post("https://id.twitch.tv/oauth2/token?client_id=qh6jfouob87senzmm6422jomq4ui44&client_secret=83qdp141qoaog5ybcmwpr4z7u6wj4y&grant_type=client_credentials")
            .then(function (response) {
                // console.log("response in auth func", response.data.access_token);
                var token = response.data.access_token;
                // console.log("token in auth function", token);
                return token;
            }, function (err) {
                console.log(err);
            });

    }

var token = getToken();
module.exports = token;