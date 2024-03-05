const { StatusCodes } = require('http-status-codes');
const { ProductService } = require('../services/index');

const productService = new ProductService();

const create = async (req, res) => {
    try {
        const response = await productService.createProduct(req.body);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully added the product in system"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: true,
            error: error,
            message: "No able to add the product in system"
        });
    }
}


module.exports = {
    create
};