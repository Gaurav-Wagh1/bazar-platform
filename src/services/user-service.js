const { UserRepository } = require("../repositories/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const response = await this.userRepository.createUser(data);
      return response;
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
}

module.exports = UserService;
