const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  TOKEN_STRING: process.env.TOKEN_STRING
};
