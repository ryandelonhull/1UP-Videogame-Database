// $(".api").on("click", function () {
    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/https://id.twitch.tv/oauth2/token?client_id=qh6jfouob87senzmm6422jomq4ui44&client_secret=83qdp141qoaog5ybcmwpr4z7u6wj4y&grant_type=client_credentials",
    //     method: "POST"
    // }).then(function (response) {
    //     console.log(response);
    //     $(".api").text(JSON.stringify(response));
    //     query("Bearer ", response.access_token);
    // });
// });

// let url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/?search="+ search +"&fields=" + f;

function query(x) {
    let f = "age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites"
    let url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/";
    let h = new Headers();
    h.append("Client-ID", "qh6jfouob87senzmm6422jomq4ui44");
    h.append("Authorization", x);
    // h.append("fields", "description,game,name,platform,published_at,test_dummy,theme;")
    let request = new Request(url, {
        method: "POST",
        headers: h,
        data: "fields version_title,videos,websites;"
    });
    fetch(request)
        .then(res => res.json())
        .then(response => {
            console.log(response);
            // $(".api").append(response);
        }).catch(err => {
            console.log(err);
        });
}

// function query(x) {
//     let search = "halo";
//     let f = "age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites"
//     let url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/covers/?checksum=89694&fields=fields alpha_channel,animated,checksum,game,height,image_id,url,width";
//     let h = new Headers();
//     h.append("Client-ID", "qh6jfouob87senzmm6422jomq4ui44");
//     h.append("Authorization", x);
//     // h.append("fields", "description,game,name,platform,published_at,test_dummy,theme;")
    
        
//     let request = new Request(url, {
//         method: "POST",
//         headers: h,
//         // data: "fields name"
//     });
//     fetch(request)
//         .then(res => res.json())
//         .then(response => {
//             console.log(response);
//             // $(".api").append(response);
//         }).catch(err => {
//             console.log(err);
//         });


// }
query("Bearer rbxgjth5g8na1f4x8r7gduja3ae645");

// type: "POST",
//     url: url,
//         dataType: "json",
//     }).then(function (response) {
//             $

//   console.log("token = ", x);
//   $.ajax({
//       url: "https://api.igdb.com/v4/games?
//       method: "POST"
//   }).then(function (response) {
//       $(".api").text(JSON.stringify(response));
//   });