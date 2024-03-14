const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");
const {
    CLOUDINARY_API_KEY,
    CLOUDINAY_API_SECRET,
    CLOUDINARY_CLOUD_NAME
} = require("../config/server-config");
const { AppError } = require("./error-classes");

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINAY_API_SECRET
});


const uploadImageOnCloudinary = async (imagePath) => {
    try {
        if (!imagePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(imagePath, {
            resource_type: "image"
        });
        fs.unlinkSync(imagePath);
        return response.url;
    } catch (error) {
        fs.unlinkSync(imagePath);
        console.log(error);
        throw new AppError("Server Error!", StatusCodes.INTERNAL_SERVER_ERROR, "Not able to upload the file, kindly try again!");
    }
}

module.exports = uploadImageOnCloudinary;