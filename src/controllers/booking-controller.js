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

module.exports = {
    create,
    createOne
}