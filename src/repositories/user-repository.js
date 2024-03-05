const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/index");
const { AppError } = require("../utils/error-classes");

class UserRepository {
  async createUser(data) {
    try {
      await User.create(data);
      return true;
    } catch (error) {
      if (error.name == "SequelizeUniqueConstraintError") {
        throw new AppError(
          "User already exists!",
          StatusCodes.BAD_GATEWAY,
          "User already exists, please sign in"
        );
      }
      console.log("Error at repository layer", error);
      throw new AppError(error.name);
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ["password", "destroyTime"] },
      });
      if (!user) {
        throw new AppError(
          "No such user exists",
          StatusCodes.BAD_GATEWAY,
          "No such user exists, please sign up first!"
        );
      }
      return user;
    } catch (error) {
      console.log("Error at repository layer", error);
      if (error.name === "No such user exists") {
        throw error;
      }
      throw new AppError(error.name);
    }
  }

  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        }
      });
      if (!user) {
        throw new AppError(
          "No such user exists",
          StatusCodes.BAD_GATEWAY,
          "No such user exists, please sign up first!"
        );
      }
      return user;
    } catch (error) {
      console.log("Error at repository layer", error);
      if (error.name === "No such user exists") {
        throw error;
      }
      throw new AppError(error.name);
    }
  }

  async updateUser(userId, data) {
    try {
      const user = await User.update(data, { where: { id: userId } });
      if (!user[0]) {
        throw new AppError(
          "No such user exists",
          StatusCodes.BAD_GATEWAY,
          "No such user exists, please sign up first!"
        );
      }
      return user;
    } catch (error) {
      console.log("Error at repository layer", error);
      if (error.name === "No such user exists") {
        throw error;
      }
      throw new AppError(error.name);
    }
  }

  async destroyUser(userId) {
    console.log(userId);
    try {
      const response = await User.destroy({ where: { id: userId } });
      if (!response) {
        throw new AppError(
          "User not exists!",
          StatusCodes.BAD_GATEWAY,
          "No such user exists in the system !"
        );
      }
      return response;
    } catch (error) {
      console.log("Error at repository layer", error);
      if (error.name === "User not exists!") {
        throw error;
      }
      throw new AppError(error.name);
    }
  }
}

module.exports = UserRepository;
