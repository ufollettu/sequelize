'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    // ss_id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    paranoid: true,
    underscored: true,
    timestamps: false
  });
  Article.associate = function(models) {
    // Article.belongsTo(models.User);
    // associations can be defined here
  };
  return Article;
};