import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./ForgotPassword.css";
import logo from "../../../public/images/logo.png";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                {
                    email,
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/verify-otp", {
                    state: { email },
                });

            }, 1000);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="forgot-container">
            <form
                className="forgot-card"
                onSubmit={handleSubmit}
            >
                <img
                    src={logo}
                    alt="TurboToys"
                    className="forgot-logo"
                />

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email to receive an OTP.
                </p>

                <label>Email Address</label>

                <div className="forgot-input">

                    <FaEnvelope />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <button
                    className="forgot-btn"
                    type="submit"
                >
                    Send OTP
                </button>

                <div className="back-login">

                    <Link to="/login">

                        ← Back to Login

                    </Link>

                </div>
            </form>


        </div>

    );

};

export default ForgotPassword;