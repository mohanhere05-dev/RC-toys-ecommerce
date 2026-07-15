import { useState, useRef, useEffect } from "react"; import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../../public/images/logo.png";
import "./VerifyOTP.css";

const VerifyOTP = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {

        if (timer === 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

    };

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {

            inputRefs.current[index - 1].focus();

        }

    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .trim()
            .slice(0, 6);

        if (!/^\d+$/.test(pasted)) return;

        const newOtp = pasted.split("");

        while (newOtp.length < 6) {

            newOtp.push("");

        }

        setOtp(newOtp);

        const lastIndex = Math.min(pasted.length - 1, 5);

        inputRefs.current[lastIndex].focus();

    };

    const handleVerify = async (e) => {

        e.preventDefault();

        const otpValue = otp.join("");

        if (otpValue.length !== 6) {

            toast.error("Enter complete OTP");

            return;

        }

        try {

            const response = await axios.post(

                "${import.meta.env.VITE_API_URL}/api/auth/verify-otp",

                {
                    email,
                    otp: otpValue,
                }

            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/reset-password", {

                    state: {

                        email,

                        otp: otpValue,

                    },

                });

            }, 1000);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "OTP Verification Failed"

            );

        }

    };

    const handleResendOTP = async () => {

        if (timer > 0) return;

        try {

            setLoading(true);

            const response = await axios.post(

                "${import.meta.env.VITE_API_URL}/api/auth/forgot-password",

                {
                    email,
                }

            );

            toast.success(response.data.message);

            setTimer(30);

            setOtp(["", "", "", "", "", ""]);

            inputRefs.current[0].focus();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to resend OTP"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="verify-page">

            <div className="verify-card">

                <div className="verify-logo-wrapper">

                    <img
                        src={logo}
                        alt=""
                        className="verify-logo"
                    />

                </div>

                <h1>Verify OTP</h1>

                <p>

                    Enter the 6-digit OTP sent to your email

                </p>

                <form onSubmit={handleVerify}>

                    <div
                        className="otp-container"
                        onPaste={handlePaste}
                    >

                        {

                            otp.map((digit, index) => (

                                <input

                                    key={index}

                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }

                                    className="otp-input"

                                    type="text"

                                    maxLength={1}

                                    value={digit}

                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            index
                                        )
                                    }

                                    onKeyDown={(e) =>
                                        handleKeyDown(
                                            e,
                                            index
                                        )
                                    }

                                />

                            ))

                        }

                    </div>

                    <button
                        className="verify-btn"
                        type="submit"
                    >

                        Verify OTP

                    </button>

                </form>

                <div className="resend-text">

                    {

                        timer > 0 ? (

                            <p>

                                Resend OTP in

                                <span>

                                    {" "}00:{timer.toString().padStart(2, "0")}

                                </span>

                            </p>

                        ) : (

                            <button

                                className="resend-btn"

                                type="button"

                                onClick={handleResendOTP}

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? "Sending..."

                                        : "Resend OTP"

                                }

                            </button>

                        )

                    }

                </div>

                <div className="back-login">

                    <Link to="/login">

                        ← Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default VerifyOTP;