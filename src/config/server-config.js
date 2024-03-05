const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASS: process.env.EMAIL_PASS,
  TOKEN_STRING: process.env.TOKEN_STRING
};
