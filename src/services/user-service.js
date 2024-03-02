var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const { UserRepository } = require("../repositories/index");
const { AppError } = require("../utils/error-classes");
const { StatusCodes } = require("http-status-codes");
const { TOKEN_STRING } = require("../config/server-config");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      await this.userRepository.createUser(data);
      const jwtToken = await this.#createJwtToken({ email: data.email });
      return jwtToken;
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async signIn(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      const response = await bcrypt.compare(data.password, user.password);
      if (!response) {
        throw new AppError(
          "UnAuthenticated User",
          StatusCodes.BAD_REQUEST,
          "Incorrect Password, User is not authenticated"
        );
      }
      const jwtToken = await this.#createJwtToken({ email: user.email });
      return jwtToken;
    } catch (error) {
      if (error.name === "UnAuthenticated User") {
        throw error;
      }
      console.log("Something error at service layer", error);
      throw new AppError(error.name);
    }
  }

  async getUser(userId) {
    try {
      const response = await this.userRepository.getUser(userId);
      return response;
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      const response = await this.userRepository.updateUser(userId, data);
      return response;
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.userRepository.destroyUser(userId);
      return response;
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async authenticateUser(token) {
    try {
      await this.#validateToken(token);
      return true;
    } catch (error) {
      if (error.message === "invalid signature") {
        throw new AppError(
          "UnAuthenticated",
          StatusCodes.METHOD_NOT_ALLOWED,
          "User is not authenticated to perform this action!"
        );
      }

      console.log("Something went wrong in authentication", error);
      throw new AppError(error.name);
    }
  }

  async #createJwtToken(data) {
    const token = jwt.sign(data, TOKEN_STRING, { expiresIn: "1d" });
    return token;
  }

  async #validateToken(token) {
    const response = jwt.verify(token, TOKEN_STRING);
    return response;
  }
}

module.exports = UserService;
