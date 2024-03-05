const { StatusCodes } = require("http-status-codes");
const emailTransporter = require("../config/email-config");
const { AppError } = require("./error-classes");

const sendEmail = (emailData) => {
    emailTransporter
        .sendMail(emailData,
            function (err, data) {
                if (err) {
                    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR, "Not able to send the mail");
                } else {
                    return 'Email sent successfully';
                }
            });
}

module.exports = { sendEmail };