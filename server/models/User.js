import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        photo: {
            type: String,
            default: "",
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        otp: {
            type: String,
            default: "",
        },

        otpExpire: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;