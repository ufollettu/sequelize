'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Articles', {
    slug: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true, // (UNIQUE)
      allowNull: false // required (NOT NULL)
    },
    // body: DataTypes.TEXT,
    body: {
      type: DataTypes.TEXT,
      defaultValue: 'titolo di default'
    }

  }, {
    paranoid: true,
    underscored: true,
    timestamps: false,
    // freezeTableName: true
  });
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};