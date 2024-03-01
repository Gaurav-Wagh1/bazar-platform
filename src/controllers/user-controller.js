const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services/index.js");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    return res.status(StatusCodes.CREATED).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully created user",
    });
  } catch (error) {
    return res.status(error.errorCode).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      data: "Successfully updated user information",
      success: true,
      error: {},
      message: "Successfully updated user",
    });
  } catch (error) {
    return res.status(error.errorCode).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await userService.getUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully fetched user",
    });
  } catch (error) {
    return res.status(error.errorCode).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userService.deleteUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully deleted user",
    });
  } catch (error) {
    return res.status(error.errorCode).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  update,
  get,
  destroy,
};
