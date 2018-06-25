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
<<<<<<< HEAD
    body: DataTypes.TEXT,
    timestamp: DataTypes.DATE
=======
    // body: DataTypes.TEXT,
    body: {
      type: DataTypes.TEXT,
      // defaultValue: 'titolo di default'
      // validate: {
      //   // set a validation function
      //   startsWithUpper: (bodyVal)=>{
      //     let first = bodyVal.charAt(0);
      //     let startsWithUpper = first === first.toUpperCase();
      //     if (!startsWithUpper) {
      //       throw new Error('first letter must be uppercase');
      //     } else {
      //       // ...
      //     }
      //   }
      // }
    }, 
    timestamp: DataTypes.DATE

>>>>>>> 9c98c60b126b848270691c3b5e05d2a29e603faf
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