'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    paranoid: true,
    underscored: true
  });
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};