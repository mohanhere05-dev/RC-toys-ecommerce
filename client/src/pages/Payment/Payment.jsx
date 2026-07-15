import { useLocation } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import "./Payment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { useState } from "react";

const Payment = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );
    const shippingAddress = location.state?.shippingAddress;
    if (!shippingAddress) {

        navigate("/checkout");

        return null;

    }

    const [loading, setLoading] = useState(false);
    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {

            toast.error("Your cart is empty");

            navigate("/cart");

            return;

        }
        setLoading(true);
        try {

            const token = localStorage.getItem("token");

            const orderItems = cartItems.map((item) => ({

                product: item._id,

                quantity: item.quantity,

                price: item.price,

            }));

            const totalPrice = cartItems.reduce(

                (total, item) =>

                    total + item.price * item.quantity,

                0

            );

            const { data } = await axios.post(

                "${import.meta.env.VITE_API_URL}/api/orders",

                {

                    orderItems,

                    shippingAddress,

                    totalPrice,

                    paymentMethod: "Cash On Delivery",

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success(data.message);

            dispatch(clearCart());

            navigate("/order-success", {

                state: {

                    order: data.order,

                },

            });

        }

        catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message || "Place Order Failed"
            );
        } finally {

            setLoading(false);

        }


    };
    return (

        <div className="payment-page">

            <div className="payment-wrapper">

                <div className="payment-left">

                    <div className="payment-card">

                        <span className="step">
                            Step 2 of 2
                        </span>

                        <h1>Payment</h1>

                        <p>
                            Choose your payment method and review your order.
                        </p>

                        <div className="payment-section">

                            <h3>Payment Method</h3>

                            <label className="payment-option active">

                                <input
                                    type="radio"
                                    checked
                                    readOnly
                                />

                                <div>

                                    <strong>
                                        Cash On Delivery
                                    </strong>

                                    <p>
                                        Pay when your order is delivered.
                                    </p>

                                </div>

                            </label>

                            <label className="payment-option disabled">

                                <input
                                    type="radio"
                                    disabled
                                />

                                <div>

                                    <strong>
                                        Credit / Debit Card
                                    </strong>

                                    <p>
                                        Coming Soon
                                    </p>

                                </div>

                            </label>

                            <label className="payment-option disabled">

                                <input
                                    type="radio"
                                    disabled
                                />

                                <div>

                                    <strong>
                                        UPI
                                    </strong>

                                    <p>
                                        Coming Soon
                                    </p>

                                </div>

                            </label>

                        </div>

                        <div className="payment-section">

                            <h3>Shipping Address</h3>

                            <div className="address-box">

                                <p>
                                    <strong>
                                        {shippingAddress?.fullName}
                                    </strong>
                                </p>

                                <p>
                                    {shippingAddress?.phone}
                                </p>

                                <p>
                                    {shippingAddress?.address}
                                </p>

                                <p>
                                    {shippingAddress?.city},{" "}
                                    {shippingAddress?.state}
                                </p>

                                <p>
                                    {shippingAddress?.pincode}
                                </p>

                            </div>

                        </div>

                        <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>

                            Place Order

                        </button>

                    </div>

                </div>

                <div className="payment-right">

                    <OrderSummary />

                </div>

            </div>

        </div>

    );

};

export default Payment;