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
            success: false,
            error: error,
            message: "No able to add the product in system"
        });
    }
}

const get = async(req, res) => {
    try {
        const response = await productService.getProduct(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully fetched the product"
        });
    } catch (error) {
        return res.status(error.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error.name,
            message: error.message
        });
    }
}

const getAll = async(req, res) => {
    try {
        const response = await productService.getAllProducts(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully fetched the products"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error,
            message: "No able to fetch the products"
        });
    }
}


module.exports = {
    create,
    get,
    getAll
};