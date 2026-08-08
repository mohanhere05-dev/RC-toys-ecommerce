import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import "./OrderDetails.css";
import Loading from "../../components/Loading";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOrder(data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load order"
            );
        }
    };

    if (!order) {
        return <h2 className="loading"><Loading /></h2>;
    }

    // 1. Calculations for Subtotal, GST, and Grand Total
    const subtotal = order?.totalPrice || 0;
    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const grandTotal = subtotal + gstAmount;

    return (
        <>
            <Navbar />
            <div className="order-details-page">
                <div className="order-details-card">
                    <h1>Order Details</h1>
                    <span className="order-id">
                        Order ID : {order._id}
                    </span>

                    <div className="status-box">
                        <div>
                            <strong>Status</strong>
                            <p>{order.orderStatus}</p>
                        </div>
                        <div>
                            <strong>Payment</strong>
                            <p>{order.paymentStatus}</p>
                        </div>
                    </div>

                    <div className="shipping-box">
                        <h3>Shipping Address</h3>
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.phone}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                        <p>{order.shippingAddress.pincode}</p>
                    </div>

                    <div className="products-box">
                        <h3>Ordered Products</h3>
                        {
                            order.orderItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="product-row"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />
                                    <div>
                                        <h4>{item.product.name}</h4>
                                        <p>Qty : {item.quantity}</p>
                                    </div>
                                    <strong>₹{item.price}</strong>
                                </div>
                            ))
                        }
                    </div>

                    {/* Breakdown with Subtotal, GST, and Total Amount */}
                    <div className="total-box" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <span>GST (18%)</span>
                            <span>₹{gstAmount.toFixed(2)}</span>
                        </div>
                        <hr style={{ width: "100%", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "4px 0" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <h2>Total Amount</h2>
                            <h2 style={{ color: "#3b82f6" }}>₹{grandTotal.toFixed(2)}</h2>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default OrderDetails;