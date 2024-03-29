"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSKU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product);
      this.hasMany(models.CartItem);
      this.hasMany(models.OrderItem);
    }
  }
  ProductSKU.init(
    {
      variety: DataTypes.STRING,
      highlights: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "ProductSKU",
    }
  );
  return ProductSKU;
};
