var orm = require("../config/orm.js");

// code that will call ORM functions using burger specific input
// export at the end of file

var vg = {
    selectAll: function(table, cb) {
        orm.selectAll(table, function(res){
            // console.log(res);
            cb(res);
        });
    }, 
    insertOne: function(table, col, val, cb){
        orm.insertOne(table, col, val, function(res){
            cb(res);
        });
    },
    updateOne: function(table, col, val, col2, val2, cb){
        orm.updateOne(table, col, val, col2, val2, function(res){
            cb(res);
        });
    },
    deleteOne: function(table, col, id, cb){
        orm.deleteOne(table, col, id, function(res){
            cb(res);
        });
    }
};


module.exports = vg;