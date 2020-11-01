// const axios = require("axios");
// var token =
//     axios({
//         url: "https://cors-anywhere.herokuapp.com/https://id.twitch.tv/oauth2/token?client_id=qh6jfouob87senzmm6422jomq4ui44&client_secret=83qdp141qoaog5ybcmwpr4z7u6wj4y&grant_type=client_credentials",
//         method: "POST",
//         // 'params': {
//         //     'Client-ID': 'qh6jfouob87senzmm6422jomq4ui44',
//         //     'Client-Secret': '83qdp141qoaog5ybcmwpr4z7u6wj4y',
//         //     'grant_type': 'client_credentials'
//         // }
//     }).then(function (err, response) {
//         catch: err
//         console.log(response);
//         // $(".api").text(JSON.stringify(response));
//         // query("Bearer ", response.access_token);
//         token = response.access_token;
//         console.log(token);
//     });
// console.log(token);

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://id.twitch.tv/oauth2/token?client_id=qh6jfouob87senzmm6422jomq4ui44&client_secret=83qdp141qoaog5ybcmwpr4z7u6wj4y&grant_type=client_credentials",
    method: "POST"
}).then(function (response) {
    console.log(response);
    $("#test").text(JSON.stringify(response));
    console.log(response.access_token);
    // query("Bearer ", response.access_token);
});