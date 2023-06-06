import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;
        console.log("request body", req.body);
        console.log(
            "phone from frontend",
            name,
            email,
            password,
            phone,
            address
        );
        // validation
        if (!name) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "Please enter valid name",
                    err,
                });
        }
        if (!email) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "Please enter valid email",
                    err,
                });
        }
        if (!password) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "Please enter valid password",
                    err,
                });
        }
        if (!phone) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "Please enter valid phone",
                    err,
                });
        }
        if (!address) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "Please enter valid address",
                    err,
                });
        }

        // check user
        const existingUser = await userModel.findOne({ email });
        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists please login",
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const newUser = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();
        res.status(200).send({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: err.message, err });
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Email and Password are Required",
            });
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Password is incorrect",
            });
        }
        // token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (err) {
        console.log("err");
        res.status(500).send({ success: false, message: err.message, err });
    }
};

// test controller
export const testController = (req, res) => {
    res.status(200).send({
        success: true,
        message: "This is a protected route",
    });
    console.log("Protected route");
};
