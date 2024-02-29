"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product);
    }
  }
  Supplier.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 10],
          isAlphanumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 10],
        },
      },
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
