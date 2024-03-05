'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiry: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};