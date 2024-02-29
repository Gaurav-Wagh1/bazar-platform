"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OrderDetail, {
        foreignKey: "orderId",
      });
      this.belongsTo(models.ProductSKU, {
        foreignKey: "productSkuId",
      });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.INTEGER,
      productSkuId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
