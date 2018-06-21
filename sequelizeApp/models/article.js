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
      allowNull: false, // required (NOT NULL)
      validate: {
        len: {
          args: [10, 100],
          msg: 'immetti un titolo tra 10 e 100 caratteri'
        }
      } 
    },
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
    }

  }, {
    paranoid: true,
    underscored: true,
    timestamps: false,
    // freezeTableName: true
    hooks: {
      beforeValidate: () => {},
      afterValidate: () => {},
      beforeCreate: () => {

      },
      afterCreate: () => {

      },
    }
  });
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};