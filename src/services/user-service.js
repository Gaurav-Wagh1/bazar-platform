var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const crypto = require("crypto")

const { UserRepository } = require("../repositories/index");
const { TokenRepository } = require("../repositories/index");
const { AppError } = require("../utils/error-classes");
const { StatusCodes } = require("http-status-codes");
const { TOKEN_STRING, EMAIL_ID } = require("../config/server-config");
const { sendEmail } = require("../utils/send-mail");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();
  }

  async createUser(data) {
    try {
      const userId = await this.userRepository.createUser(data);
      const jwtToken = await this.#createJwtToken({ email: data.email });
      return { userId, jwtToken };
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async forgetPassword(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new AppError("No user", StatusCodes.BAD_REQUEST, "No such user exists on system!");
      }
      const verificationCode = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
      await this.tokenRepository.removeToken({ UserId: user.id });
      await user.createToken({ token: verificationCode });
      const mailData = {
        from: EMAIL_ID,
        to: data.email,
        subject: "Verification code for updating password",
        text: `Hello ${user.fullName}, verification code for your password update request is given below, if you have requested kindly ignore it. \n 
          Verification code :- ${verificationCode}`
      }
      sendEmail(mailData);
      return user.id;
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
    }
  }

  async updatePassword(userId, data) {  // password, verificationCode
    try {
      const user = await this.userRepository.getUser(userId);
      const userToken = await user.getToken();
      if (data.verificationCode !== userToken.token) {
        throw new AppError("Invalid code", StatusCodes.BAD_REQUEST, "Please give the valid verification code!");
      }
      user.password = data.password;
      await user.save();
      await this.tokenRepository.removeToken({ id: userToken.id });
      const mailData = {
        from: EMAIL_ID,
        to: user.email,
        subject: "Successfully updated password",
        text: `Hello ${user.fullName}, password of your account is updated successfully. \n
        If not done by you, kindly update the password ASAP`
      }
      sendEmail(mailData);
      return true;
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
      return { userId: user.id, jwtToken };
    } catch (error) {
      console.log("Something error at service layer", error);
      throw error;
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
