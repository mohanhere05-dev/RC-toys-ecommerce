import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const order = location.state?.order;

    return (

        <div className="success-page">

            <div className="success-card">

                <FaCheckCircle className="success-icon" />

                <h1>Order Placed Successfully!</h1>

                <p>

                    Thank you for shopping with TurboToys.

                </p>

                <div className="success-details">

                    <div>

                        <span>Order ID</span>

                        <strong>

                            {order?._id || "N/A"}

                        </strong>

                    </div>

                    <div>

                        <span>Payment Method</span>

                        <strong>

                            {order?.paymentMethod || "Cash On Delivery"}

                        </strong>

                    </div>

                    <div>

                        <span>Order Status</span>

                        <strong>

                            {order?.orderStatus || "Processing"}

                        </strong>

                    </div>

                    <div>

                        <span>Total Amount</span>

                        <strong>

                            ₹{order?.totalPrice || 0}

                        </strong>

                    </div>

                </div>

                <div className="success-buttons">

                    <button
                        onClick={() => navigate("/my-orders")}
                    >
                        View My Orders
                    </button>

                    <button
                        className="continue-btn"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>

    );

};

export default OrderSuccess;