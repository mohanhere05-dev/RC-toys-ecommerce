import express from "express";
import { registerUser, loginUser, googleLogin, forgotPassword, verifyOTP, resetPassword } from "../controllers/authController.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

router.get("/test-email", async (req, res) => {
    try {

        await sendEmail(
            "namohan007@gmail.com",
            "TurboToys Test Mail",
            "🎉 Congratulations! Email is working successfully."
        );

        res.json({
            message: "Email Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

router.get("/test-email", async (req, res) => {
    try {
        await sendEmail(
            "namohan007@gmail.com",
            "TurboToys Test Mail",
            "🎉 Congratulations! Resend is working successfully."
        );

        res.json({
            message: "Email Sent Successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;