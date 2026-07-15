import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.name = req.body.name || user.name;

        await user.save();

        res.status(200).json({

            message: "Profile Updated Successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


export const changePassword = async (req, res) => {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({
            message: "New password must be different"
        });
    }

    try {

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Current Password is Incorrect"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.status(200).json({
            message: "Password Changed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET ALL USERS (Admin)
export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// DELETE USER (Admin)
export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });

        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {

            return res.status(400).json({
                message: "You cannot delete your own account",
            });

        }

        // Prevent deleting another admin
        if (user.isAdmin) {

            return res.status(400).json({
                message: "Admin account cannot be deleted",
            });

        }

        await user.deleteOne();

        res.status(200).json({
            message: "User Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};