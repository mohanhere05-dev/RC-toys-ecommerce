import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";


// ===============================
// Login User
// ===============================
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        // Google account check
        if (!user.password) {

            return res.status(400).json({
                message: "This account uses Google Sign-In. Please continue with Google."
            });

        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        // Generate JWT
        const token = jwt.sign(

            {
                id: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                isAdmin: user.isAdmin,

            },

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};
// ===============================
// Register User
// ===============================

export const registerUser = async (req, res) => {
    console.log(req.body);
    try {

        const { name, email, password } = req.body;

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// ===============================
// googleLogin User
// ===============================
export const googleLogin = async (req, res) => {

    try {

        const { name, email, photo } = req.body;

        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({
                name,
                email,
                photo,
                password: null,
            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: "7d" }

        );

        res.status(200).json({

            message: "Google Login Successful",

            token,

            user

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// ForgotPassword User
// ===============================

export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Google account check
        if (!user.password) {
            return res.status(400).json({
                message: "This account uses Google Sign-In."
            });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail(
            user.email,
            "TurboToys Password Reset OTP",
            `Your OTP is ${otp}. It is valid for 5 minutes.`
        );

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// VerifyOTP
// ===============================


export const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        res.status(200).json({
            message: "OTP Verified Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// resetPassword User
// ===============================


export const resetPassword = async (req, res) => {

    try {

        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        user.otp = "";

        user.otpExpire = null;

        await user.save();

        res.status(200).json({
            message: "Password Reset Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
