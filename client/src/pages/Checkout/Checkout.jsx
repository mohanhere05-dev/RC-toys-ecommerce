import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import "./Checkout.css";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import logo from '../../../public/images/logo.png'
import { MdLock } from "react-icons/md";

const Checkout = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.pincode
        ) {

            toast.error("Please fill all required fields");

            return;

        }

        navigate("/payment", {

            state: {

                shippingAddress: formData,

            },

        });

    };

    const navigate = useNavigate();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    return (
        <>
            <div className="header">
                <div className="brand">
                    <img src={logo} alt="" />
                    <h1>RC World</h1>
                </div>
                <span>SECURE CHECKOUT  <MdLock /></span>
            </div>
            <div className="checkout-page">

                <div className="checkout-wrapper">

                    <div className="checkout-left">

                        <div className="checkout-card">

                            <h1>Shipping Address</h1>

                            <p>
                                Please enter your delivery details
                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="input-box">

                                    <FaUser />

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <FaPhoneAlt />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <FaMapMarkerAlt />

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="input-box">

                                    <input
                                        type="text"
                                        name="landmark"
                                        placeholder="Landmark (Optional)"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                    />

                                </div>

                                <button
                                    className="checkout-btn"
                                    type="submit"
                                >

                                    Continue

                                </button>

                            </form>

                        </div>

                    </div>

                    <div className="checkout-right">

                        <OrderSummary />

                    </div>

                </div>

            </div>

        </>
    );

};


export default Checkout;