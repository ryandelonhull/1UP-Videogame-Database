// forces code to execute in strict mode - different semantics than normal code
'use strict';
// sequelize base code
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

// if production environment set up properly in config.json, create database using current config
if (config.use_env_variable) {
  // creates instance of sequelize class 
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  // create new sequelize connection
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// reads each file in models folder
// filters them for js files 
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // create an object called db, each property on the object is a specific model which will become a table
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// takes each key from db - model names loops around them 
// - if that model has any associations(connections between tables)
// run associate method, pass database
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
