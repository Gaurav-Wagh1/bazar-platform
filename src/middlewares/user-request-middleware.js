const { StatusCodes } = require("http-status-codes");

const validateUserRequest = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(StatusCodes.BAD_GATEWAY).json({
      data: {},
      success: false,
      error: "Invalid data provided",
      message: "Please provide valid email and password!",
    });
  }
  next();
};

const validateAuthenticate = (req, res, next) => {
  if (!req.headers['access-token']) {
    return res.status(StatusCodes.BAD_GATEWAY).json({
      data: {},
      success: false,
      error: "Invalid data provided",
      message: "Please provide valid JWT token!",
    });
  }
  next();
}

module.exports = {
  validateUserRequest,
  validateAuthenticate
};
