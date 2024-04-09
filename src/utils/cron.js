const cron = require('node-cron');

const { BookingRepository } = require("../repositories/index");

const bookingRepository = new BookingRepository();

const updateBookingStatus = async () => {
    try {
        await bookingRepository.getBookedOrderDetailsAndUpdateStatus();
    } catch (error) {
        console.log(error);
    }
}

const cronJob = () => {
    cron.schedule("*/5 * * * *", () => {            // execute after each 5 seconds;
        updateBookingStatus();
    })
};


module.exports = { cronJob };