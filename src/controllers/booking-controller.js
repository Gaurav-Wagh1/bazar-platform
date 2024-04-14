const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.user);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully booked the product"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error.name || error,
            message: error.message || "Not able to book the product"
        });
    }
}

const createOne = async (req, res) => {
    try {
        const response = await bookingService.createOne(req.user, req.body.id, req.body.quantity);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully booked the product"
        });;
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error.name || error,
            message: error.message || "Not able to book the product"
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await bookingService.getOrder(req.params.orderId);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully fetched the order details"
        });;
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error.name || error,
            message: error.message || "Not able to fetch the order details"
        });
    }
}

const getAll = async (req, res) => {
    try {
        const response = await bookingService.getAllOrders(req.user);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully fetched all the orders"
        });;
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            error: error.name || error,
            message: error.message || "Not able to fetch the orders"
        });
    }
}

module.exports = {
    create,
    createOne,
    get,
    getAll
}