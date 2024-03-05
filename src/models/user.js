"use strict";
const { Model } = require("sequelize");
var bcrypt = require("bcryptjs");

const { SALT } = require("../config/server-config");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Cart);
      this.hasOne(models.Token);
      this.hasMany(models.OrderDetail);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
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
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 10],
        },
      },
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      postalCode: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(v) {
          const f_name = v.substring(0, v.indexOf(" "));
          const l_name = v.substring(v.indexOf(" ") + 1);
          this.firstName = f_name;
          this.lastName = l_name;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, SALT);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, SALT);
    user.password = hashedPassword;
  })

  return User;
};
