const express = require("express");
const router = express.Router();

const { UserController, ProductController, CartController } = require("../../controllers/index.js");

const {
  validateUserRequest,
  validateAuthenticate
} = require("../../middlewares/user-request-middleware.js");
const { UserRepository } = require("../../repositories/index.js");

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


// ----------------------------------- FORGOT PASSWORD ROUTES -----------------------------------

router.post("/forgetpassword", UserController.forgetPassword);

router.post("/updatepassword/:id", UserController.updatePassword);


// ----------------------------------- PRODUCT ROUTES -----------------------------------


router.post("/products", ProductController.create);

router.get("/products/:id", ProductController.get);

router.get("/products/", ProductController.getAll);

// ----------------------------------- CART ROUTES -----------------------------------

router.post("/carts", CartController.create);

router.delete("/carts/:id", CartController.destroy);

router.get("/carts/:id", CartController.get);

module.exports = router;
