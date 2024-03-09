const express = require("express");
const router = express.Router();

const { UserController, ProductController, CartController, BookingController } = require("../../controllers/index.js");

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

router.patch("/users/:id", UserController.update);

router.delete("/users/:id", UserController.destroy);


// ----------------------------------- FORGOT PASSWORD ROUTES -----------------------------------

router.post("/forgetpassword", UserController.forgetPassword);

router.patch("/updatepassword/:id", UserController.updatePassword);


// ----------------------------------- PRODUCT ROUTES -----------------------------------


router.post("/products", ProductController.create);

router.get("/products/:id", ProductController.get);

router.get("/products/", ProductController.getAll);

// ----------------------------------- CART ROUTES -----------------------------------

router.post("/carts", CartController.create);

router.delete("/carts/:id", CartController.destroy);

router.get("/carts/:id", CartController.get);


// ----------------------------------- PURCHASE ROUTES -----------------------------------

router.post("/bookings/cart", BookingController.create);

module.exports = router;
