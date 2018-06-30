'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.user = require('./user')(sequelize, Sequelize);
db.articles = require('./article')(sequelize, Sequelize);

// Relations (same as Model.associate --> use here instead of in Model definition)
db.articles.belongsTo(db.user);

// Hooks
db.user.hook('beforeCreate', async (user, options) => {
  return await bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = db;
