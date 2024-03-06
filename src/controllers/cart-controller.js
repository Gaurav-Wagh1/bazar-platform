const { StatusCodes } = require("http-status-codes");
const { CartService } = require("../services/index");

const cartService = new CartService();

const create = async (req, res) => {
    try {
        const response = await cartService.addToCart(req.body);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully added the product in cart"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error,
            message: "No able to add the product in cart"
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await cartService.getCart(req.params.id);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully fetched the cart"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error,
            message: "No able to fetch the cart"
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await cartService.deleteCartItem(req.params.id);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully removed the element from cart"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error,
            message: "No able to removed the element from cart"
        });
    }
}

module.exports = {
    create,
    get,
    destroy
}