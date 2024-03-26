const { StatusCodes } = require("http-status-codes");
const fs = require("fs");

const validateAddProductRequest = (req, res, next) => {
    const productData = req.body;
    if (
        !productData.name ||
        !productData.category ||
        !productData.description ||
        !productData.subCategory ||
        !productData.variety ||
        !productData.quantity ||
        !productData.price
    ) {
        fs.unlinkSync(req.file.path);
        return res.status(StatusCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            error: "All fields are mandatory",
            message: "Kindly fill all the fields!"
        });
    }
    next();
}

module.exports = validateAddProductRequest;