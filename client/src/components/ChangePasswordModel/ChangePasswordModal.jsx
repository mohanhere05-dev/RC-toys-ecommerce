import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaTimes,
} from "react-icons/fa";
import "./ChangePasswordModal.css";

const ChangePasswordModal = ({ open, onClose }) => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleChangePassword = async (e) => {

        e.preventDefault();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword.length < 6) {
            toast.error(
                "Password must be at least 6 characters"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const { data } = await axios.put(

                `${import.meta.env.VITE_API_URL}/api/users/change-password`,

                {
                    currentPassword,
                    newPassword,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            toast.success(data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            onClose();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password Update Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="change-password-overlay"
            onClick={onClose}
        >

            <div
                className="change-password-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="close-btn"
                    onClick={onClose}
                >

                    <FaTimes />

                </button>

                <h2>Change Password</h2>

                <p>

                    Update your account password securely.

                </p>

                <form onSubmit={handleChangePassword}>

                    {/* Current Password */}

                    <label>Current Password</label>

                    <div className="password-input">

                        <FaLock />

                        <input
                            type={
                                showCurrent
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(
                                    e.target.value
                                )
                            }
                        />

                        <span
                            onClick={() =>
                                setShowCurrent(
                                    !showCurrent
                                )
                            }
                        >
                            {showCurrent ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>

                    </div>

                    {/* New Password */}

                    <label>New Password</label>

                    <div className="password-input">

                        <FaLock />

                        <input
                            type={
                                showNew
                                    ? "text"
                                    : "password"
                            }
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                        />

                        <span
                            onClick={() =>
                                setShowNew(!showNew)
                            }
                        >
                            {showNew ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>

                    </div>

                    {/* Confirm Password */}

                    <label>Confirm Password</label>

                    <div className="password-input">

                        <FaLock />

                        <input
                            type={
                                showConfirm
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                        />

                        <span
                            onClick={() =>
                                setShowConfirm(
                                    !showConfirm
                                )
                            }
                        >
                            {showConfirm ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>

                    </div>

                    <button
                        className="update-password-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update Password"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default ChangePasswordModal;