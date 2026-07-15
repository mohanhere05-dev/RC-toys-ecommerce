import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../../public/images/logo.png";
import {
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import "./ResetPassword.css";

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const otp = location.state?.otp;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleReset = async (e) => {

        e.preventDefault();

        if (!email || !otp) {
            toast.error("Invalid Request");
            navigate("/forgot-password");
            return;
        }

        if (!password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const response = await axios.post(
                "${import.meta.env.VITE_API_URL}/api/auth/reset-password",
                {
                    email,
                    otp,
                    password,
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Password Reset Failed"
            );

        }

    };

    return (

        <div className="reset-page">

            <div className="reset-card">

                <div className="reset-logo-wrapper">

                    <img
                        src={logo}
                        alt="Logo"
                        className="reset-logo"
                    />

                </div>

                <h1>Reset Password</h1>

                <p>

                    Create a new password for your account.

                </p>

                <form onSubmit={handleReset}>

                    <label>New Password</label>

                    <div className="reset-input">

                        <FaLock />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        {
                            showPassword ?

                                <FaEyeSlash
                                    className="eye-icon"
                                    onClick={() =>
                                        setShowPassword(false)
                                    }
                                />

                                :

                                <FaEye
                                    className="eye-icon"
                                    onClick={() =>
                                        setShowPassword(true)
                                    }
                                />

                        }

                    </div>

                    <label>Confirm Password</label>

                    <div className="reset-input">

                        <FaLock />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        {
                            showConfirmPassword ?

                                <FaEyeSlash
                                    className="eye-icon"
                                    onClick={() =>
                                        setShowConfirmPassword(false)
                                    }
                                />

                                :

                                <FaEye
                                    className="eye-icon"
                                    onClick={() =>
                                        setShowConfirmPassword(true)
                                    }
                                />

                        }

                    </div>

                    <button
                        className="reset-btn"
                        type="submit"
                    >

                        Reset Password

                    </button>

                </form>

                <div className="back-login">

                    <Link to="/login">

                        ← Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default ResetPassword;