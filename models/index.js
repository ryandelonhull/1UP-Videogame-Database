// puts code into 'strict mode' where undefined variables cannot be used. Cleans up code.
'use strict';
// import fs module. FS is a file server for node.js that allows a method to read from other files in the directory.
var fs        = require('fs');
//import path module with node.js functionality that has file system specific routes for handling paths. Works with different methods.
var path      = require('path');
//import sequelize module with node.js functionality.
var Sequelize = require('sequelize');
// pulls the db data
var basename  = path.basename(module.filename);
// pulls the development object from the config.json 
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
// create empty db array 
var db        = {};
// sequelize template that creates tables for the db if a new one needs to be created.
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// fs function that makes path for sequelize
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// function for object constructor that pulls the db 
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
