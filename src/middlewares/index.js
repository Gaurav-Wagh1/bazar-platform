module.exports = {
    validateUserRequest: require("./user-request-middleware.js"),
    authenticateUser: require("./authenticate-user-middleware.js"),
    multerUpload: require("./multer-middleware.js"),
    validateAddProductRequest: require("./add-product-middleware.js")
}