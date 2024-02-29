"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.PaymentDetail, {
        foreignKey: "paymentId",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.hasMany(models.OrderItem);
    }
  }
  OrderDetail.init(
    {
      userId: DataTypes.INTEGER,
      paymentId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
