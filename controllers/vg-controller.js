const express = require("express");
var router = express.Router();

const vg = require("../models/vg.js");

// displays all burgers on load
router.get("/", function (req, res) {
    // vg.selectAll(function (data) {
    //     var all = {
    //         burgers: data
    //     };
    //     res.render("index", all);
    // });
    res.render("index");
});


// router.put("/api/eat/:id", function (req, res) {
//     var id = req.params.id;
//     vg.updateOne(id, function (data) {
//         // console.log(data);
//     });
//     res.status(200).end();
// });

// deletes vg on click
router.delete("/api/delete/:id", function (req, res) {
    var id = req.params.id;
    vg.deleteOne(id, function (data) {
        // console.log(data);
    });
    res.status(200).end();
});

// adds vg on click
router.post("/api/add/", function (req, res) {
    var name = req.body.name;
    vg.insertOne(name, function (data) {
        // console.log(data);
    });
    res.status(200).end();
});

module.exports = router;