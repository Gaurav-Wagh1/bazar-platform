const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services/index.js");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    res.cookie('token', response.data, { httpOnly: true });
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

const signin = async (req, res) => {
  try {
    const response = await userService.signIn(req.body);
    res.cookie('token', response.data, { httpOnly: true });
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "User is authenticated",
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

const authenticate = async (req, res) => {
  try {
    const response = await userService.authenticateUser(req.cookies.token);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "User is authenticated",
    });
  } catch (error) {
    return res.status(error.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
}

const forgetPassword = async (req, res) => {
  try {
    const response = await userService.forgetPassword(req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "An email with verification code is sent",
    });
  } catch (error) {
    return res.status(error.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    const response = await userService.updatePassword(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      error: {},
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(error.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      error: error.name,
      message: error.message,
    });
  }
}

module.exports = {
  create,
  update,
  get,
  destroy,
  signin,
  authenticate,
  forgetPassword,
  updatePassword
};
