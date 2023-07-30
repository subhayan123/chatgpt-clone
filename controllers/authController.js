const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
//jwt token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res)
    res.status(statusCode).json({
        success: true,
        token
    });
};

//register
exports.RegisterController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        //existing user
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse("Email is already registered", 500));
        }
        const user = await userModel.create({ username, email, password });
        this.sendToken(user, 201, res);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
//login
exports.LoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return next(new errorResponse("please provide email or password"));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse("invalid credentials", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse("invalid password", 401));
        }
        //response
        this.sendToken(user, 200, res);

    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.LogoutController = async (req, res) => {
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success: true,
        message: "logout successfull"
    });
}