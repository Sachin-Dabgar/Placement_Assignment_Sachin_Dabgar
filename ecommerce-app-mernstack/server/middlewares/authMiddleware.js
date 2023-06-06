import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// protected routes token based
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
};

// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        console.log("your user is " + user);
        if (user.role !== 1) {
            return res.status(401).json({
                message: "You are not authorized to access",
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
};
