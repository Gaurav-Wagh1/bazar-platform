const express = require("express");
const router = express.Router();

const { UserController, ProductController, CartController, BookingController } = require("../../controllers/index.js");

const { validateUserRequest, authenticateUser, multerUpload, validateAddProductRequest } = require("../../middlewares/index.js");

// ----------------------------------- USER ROUTES -----------------------------------

router.post("/users/signup", validateUserRequest, UserController.create);

router.post(
  "/users/signin",
  validateUserRequest,
  UserController.signin
);

router.post("/users/logout", authenticateUser, UserController.logout);                            // secured route;

router.get("/users", authenticateUser, UserController.get);                                       // secured route;

router.patch("/users", authenticateUser, UserController.update);                                  // secured route;

router.delete("/users", authenticateUser, UserController.destroy);                                // secured route;


// ----------------------------------- FORGOT PASSWORD ROUTES -----------------------------------

router.post("/forgetpassword", UserController.forgetPassword);

router.patch("/updatepassword/:id", UserController.updatePassword);


// ----------------------------------- PRODUCT ROUTES -----------------------------------

// router.post("/products", authenticateUser, validateAddProductRequest, multerUpload.fields([                                 // secured route;
//   {
//     name: "image",
//     maxCount: 1
//   }
// ]), ProductController.create);                            

router.post("/products", authenticateUser, multerUpload.single("image"), validateAddProductRequest, ProductController.create);

router.get("/products/:id", ProductController.get);

router.get("/products", ProductController.getAll);

// ----------------------------------- CART ROUTES -----------------------------------

router.post("/carts", authenticateUser, CartController.create);                                   // secured route;

router.delete("/carts/:id", authenticateUser, CartController.destroy);                            // secured route;

router.get("/carts", authenticateUser, CartController.get);                                       // secured route;


// ----------------------------------- PURCHASE ROUTES -----------------------------------

router.post("/bookings/cart", authenticateUser, BookingController.create);                        // secured route;

router.post("/bookings", authenticateUser, BookingController.createOne);


// ----------------------------------- ORDER ROUTES -----------------------------------

router.get("/orders", authenticateUser, BookingController.getAll);

module.exports = router;
