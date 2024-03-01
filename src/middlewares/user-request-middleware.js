const {StatusCodes} = require('http-status-codes')

const validateUserRequest = (req,res,next) => {
    if(!req.body){
        return res.status(StatusCodes.BAD_GATEWAY).json({
            data:{},
            success:false,
            error:"Invalid data provided",
            message:"Please provide something in data"
        });
    }
    next();
};

module.exports = validateUserRequest;