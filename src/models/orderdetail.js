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
      this.hasOne(models.PaymentDetail);
      this.belongsTo(models.User);
      this.hasMany(models.OrderItem);
    }
  }
  OrderDetail.init(
    {
      transactionId: DataTypes.STRING,
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Delivered', 'Booked', 'On The Way', 'Cancelled', 'InProcess'],
        defaultValue: 'InProcess'
      },
      deliveryTime: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
