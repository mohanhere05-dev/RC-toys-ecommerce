import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight
} from "react-icons/fa";

import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        // Validation
        if (!name || !email || !password || !confirmPassword) {

            toast.error("Please fill all fields");
            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error("Please enter a valid email address");
            return;

        }

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");
            return;

        }

        try {

            const response = await axios.post(
                "${import.meta.env.VITE_API_URL}/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            if (!error.response) {

                toast.error("Unable to connect to server.");

            } else {

                toast.error(
                    error.response.data.message || "Registration Failed"
                );

            }

        }

    };
    return (

        <div className="register-page">

            <motion.div
                className="register-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
            >

                <div className="register-logo-wrapper">
                    <img
                        src={logo}
                        alt="TurboToys"
                        className="register-logo"
                    />
                </div>

                <h1>Create Account</h1>

                <p>
                    Join TurboToys and start your RC journey.
                </p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <div className="input-box">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <label>Email Address</label>

                    <div className="input-box">
                        <FaEnvelope />
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <label>Phone Number</label>

                    <div className="input-box">
                        <FaPhone />
                        <input
                            type="tel"
                            placeholder="+91 xxxxxxxxx0"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        />
                    </div>

                    <label>Password</label>

                    <div className="input-box">

                        <FaLock />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="eye-icon"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>

                    </div>

                    <label>Confirm Password</label>

                    <div className="input-box">

                        <FaLock />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <span
                            className="eye-icon"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {
                                showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>

                    </div>

                    <button className="register-btn" type="submit">

                        Create Account

                        <FaArrowRight />

                    </button>

                </form>

                <p className="login-link">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </motion.div>

        </div>

    );

};

export default Register;