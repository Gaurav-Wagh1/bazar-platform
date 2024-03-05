"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      this.belongsTo(models.Category);
      this.hasMany(models.Product);
    }
  }
  Subcategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Subcategory",
    }
  );
  return Subcategory;
};