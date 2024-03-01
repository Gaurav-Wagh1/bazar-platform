class AppError extends Error {
  constructor(
    name = "Internal server error",
    errorCode = 505,
    message = "Something went wrong, try again!"
  ) {
    super();
    this.name = name;
    this.errorCode = errorCode;
    this.message = message;
  }
}

module.exports = { AppError };
