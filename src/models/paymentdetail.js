"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OrderDetail);
    }
  }
  PaymentDetail.init(
    {
      amount: DataTypes.INTEGER,
      provider: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "success", "reject"],
        defaultValue: "pending",
      },
      paymentInfo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentDetail",
    }
  );
  return PaymentDetail;
};
