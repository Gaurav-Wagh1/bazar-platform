const express = require("express");
const router = express.Router();

const { UserController, ProductController } = require("../../controllers/index.js");

const {
  validateUserRequest,
  validateAuthenticate
} = require("../../middlewares/user-request-middleware.js");

// ----------------------------------- USER ROUTES -----------------------------------

router.post("/users/signup", validateUserRequest, UserController.create);

router.post(
  "/users/signin",
  validateUserRequest,
  UserController.signin
  );

  router.post("/users/authenticate", validateAuthenticate, UserController.authenticate);
  
  router.get("/users/:id", UserController.get);
  
router.patch("/users/:id", validateUserRequest, UserController.update);

router.delete("/users/:id", UserController.destroy);

// ----------------------------------- Products Routes -----------------------------------

router.post("/products", ProductController.create);

module.exports = router;
