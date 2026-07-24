import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import sendLoginEmail from "../utils/sendLoginEmail.js";

// ===============================
// Generate JWT Token
// ===============================
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// ===============================
// Login User
// ===============================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        if (!user.password) {
            return res.status(400).json({
                message: "This account uses Google Sign-In. Please continue with Google.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        // ✅ Send Login Success Email (Background)
        sendLoginEmail(user).catch((err) =>
            console.error("Login Email Error:", err)
        );

        res.status(200).json({
            message: "Login Successful",
            token: generateToken(user._id),
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
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // ✅ Welcome Email
        sendEmail(
            user.email,
            "🎉 Welcome to TurboToys",
            `Hello ${user.name},

Welcome to TurboToys!

Your account has been created successfully.

Happy Shopping 🚗

TurboToys Team`
        ).catch((err) => console.error("Welcome Email Error:", err));

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
// Google Login
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
            });

            // Welcome Email for New Google Users
            sendEmail(
                user.email,
                "🎉 Welcome to TurboToys",
                `Hello ${user.name},

Welcome to TurboToys!

Your Google account has been linked successfully.

Happy Shopping 🚗

TurboToys Team`
            ).catch(console.error);
        }

        // Login Email
        sendLoginEmail(user).catch(console.error);

        res.status(200).json({
            message: "Google Login Successful",
            token: generateToken(user._id),
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// ===============================
// Forgot Password
// ===============================
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail(
            user.email,
            "TurboToys Password Reset OTP",
            `Your OTP is ${otp}. It is valid for 5 minutes.`
        );

        res.status(200).json({
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// ===============================
// Verify OTP
// ===============================
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        res.status(200).json({
            message: "OTP Verified Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// ===============================
// Reset Password
// ===============================
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        user.otp = "";
        user.otpExpire = null;

        await user.save();

        await sendEmail(
            user.email,
            "✅ Password Changed Successfully",
            `Hello ${user.name},

Your TurboToys account password has been changed successfully.

If this wasn't you, please contact support immediately.

TurboToys Team`
        );

        res.status(200).json({
            message: "Password Reset Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};