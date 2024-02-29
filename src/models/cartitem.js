"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cart, {
        foreignKey: "cartId",
      });
      this.belongsTo(models.ProductSKU, {
        foreignKey: "productSkuId",
      });
    }
  }
  CartItem.init(
    {
      cartId: DataTypes.INTEGER,
      productSkuId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
