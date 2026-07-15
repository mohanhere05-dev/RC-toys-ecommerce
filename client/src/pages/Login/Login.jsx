import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

import logo from "../../../public/images/logo.png";
import { FaCarSide } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";

const Login = () => {
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            );
            toast.success(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            localStorage.setItem("isLoggedIn", "true");
            setTimeout(() => {

                if (response.data.user.isAdmin) {

                    window.location.href = "/admin/dashboard";

                } else {

                    window.location.href = "/";

                }

            }, 100);

        } catch (error) {
            if (!error.response) {
                toast.error("Unable to connect to server.");
            } else {
                toast.error(
                    error.response.data.message || "Login Failed"
                );
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            const firebaseUser = result.user;

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/google`,
                {
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photo: firebaseUser.photoURL,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            toast.success("Google Login Successful");

            setTimeout(() => {
                window.location.href = "/";
            }, 1000);

        } catch (error) {

            console.log(error);

            toast.error("Google Login Failed");

        }
    };

    return (
        <>
            <div className="login-page">
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5 }}
                >

                    <div className="login-logo-wrapper">
                        <img
                            src={logo}
                            alt="TurboToys"
                            className="login-logo"
                        />
                    </div>

                    <h1>Welcome Back</h1>
                    <p> Access your TurboToys account</p>

                    <form onSubmit={handleLogin}>
                        <label>Email Address</label>
                        <div className="input-box">
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="password-header">
                            <label>Password</label>
                            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                        </div>

                        <div className="input-box">
                            <FaLock />
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter Password"
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

                        <button className="login-btn" type="submit">Login
                            <FaArrowRight />
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR CONTINUE WITH</span>
                    </div>

                    <button className="google-btn" onClick={handleGoogleLogin} >
                        <FcGoogle />
                        Login with Google
                    </button>

                    <p className="signup-link">
                        Don't have an account?
                        <Link to="/register">
                            Create One
                        </Link>
                    </p>
                </motion.div>
            </div>
        </>
    );

};

export default Login;