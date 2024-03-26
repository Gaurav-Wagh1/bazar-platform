const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { TOKEN_STRING } = require("../config/server-config.js");

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.replace("Bearer ", "") || req.cookies.accessToken;
        if (!token) {
            throw "";
        }
        const decodedUserData = jwt.verify(token, TOKEN_STRING);
        if (!decodedUserData) {
            throw "";
        }
        req.user = decodedUserData;
        next();
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                data: {},
                success: false,
                error: "Unauthenticated user!",
                message: "Provide a valid token or signin again!"
            })
    }
}

module.exports = authenticateUser;