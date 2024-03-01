const express = require("express");
const router = express.Router();

const { UserController } = require("../../controllers/index.js");

const validateUserRequest = require("../../middlewares/user-request-middleware.js");

router.post("/users", validateUserRequest, UserController.create);

router.get("/users/:id", UserController.get);

router.patch("/users/:id", validateUserRequest, UserController.update);

router.delete("/users/:id", UserController.destroy);

module.exports = router;
