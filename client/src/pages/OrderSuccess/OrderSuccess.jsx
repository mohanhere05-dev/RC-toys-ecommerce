import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    // 1. Calculations for Subtotal, GST, and Final Total
    const subtotal = order?.totalPrice || 0;
    const gstRate = 0.18; // 18% GST (change if needed)
    const gstAmount = subtotal * gstRate;
    const grandTotal = subtotal + gstAmount;

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
                    
                    {/* Breakdown with GST */}
                    <div>
                        <span>Subtotal</span>
                        <strong>₹{subtotal.toFixed(2)}</strong>
                    </div>
                    <div>
                        <span>GST (18%)</span>
                        <strong>₹{gstAmount.toFixed(2)}</strong>
                    </div>
                    <div className="total-row" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px", marginTop: "4px" }}>
                        <span>Total Amount</span>
                        <strong style={{ color: "#3b82f6", fontSize: "1.1rem" }}>
                            ₹{grandTotal.toFixed(2)}
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