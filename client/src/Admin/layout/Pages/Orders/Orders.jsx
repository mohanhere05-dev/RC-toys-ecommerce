import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Orders.css";
import { motion } from "framer-motion";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/orders`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setOrders(data);

        } catch (error) {

            toast.error("Failed to Load Orders");

        }

    };

    useEffect(() => {

        getOrders();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/orders/${id}/status`,

                {
                    status,
                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Status Updated");

            getOrders();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to Update"

            );

        }

    };

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    return (

        <motion.div className="admin-orders" initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>

            <div className="orders-header">

                <h1>Orders</h1>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Payment</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order._id}>

                                <td>{order._id.slice(-6)}</td>

                                <td>{order.user?.name}</td>

                                <td>₹{order.totalPrice}</td>

                                <td>{order.paymentMethod}</td>

                                <td>

                                    <select

                                        value={order.orderStatus}

                                        onChange={(e) =>
                                            updateStatus(order._id, e.target.value)
                                        }

                                    >

                                        <option value="Pending">Pending</option>

                                        <option value="Processing">Processing</option>

                                        <option value="Shipped">Shipped</option>

                                        <option value="Delivered">Delivered</option>

                                        <option value="Cancelled">Cancelled</option>

                                    </select>

                                </td>

                                <td>

                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowModal(true);
                                        }}
                                    >
                                        View
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            {showModal && selectedOrder && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="order-top">

                            <div>

                                <h2>{selectedOrder.user?.name}</h2>

                                <p>{selectedOrder.user?.email}</p>

                            </div>

                            <span className="status-badge">

                                {selectedOrder.orderStatus}

                            </span>

                        </div>

                        <div className="shipping-card">

                            <h3>Shipping Address</h3>

                            <p>{selectedOrder.shippingAddress?.address}</p>

                            <p>
                                {selectedOrder.shippingAddress?.city},{" "}
                                {selectedOrder.shippingAddress?.state}
                            </p>

                            <p>{selectedOrder.shippingAddress?.pincode}</p>

                        </div>

                        <h3>Ordered Items</h3>

                        <div className="order-items">

                            {selectedOrder.orderItems.map((item) => (

                                <div
                                    className="order-item-card"
                                    key={item._id}
                                >

                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${item.product?.image}`}
                                        alt={item.product?.name}
                                    />

                                    <div className="item-info">

                                        <h4>{item.product?.name}</h4>

                                        <p>Quantity : {item.quantity}</p>

                                        <p>Price : ₹{item.price}</p>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="total-card">

                            Total : ₹{selectedOrder.totalPrice}

                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}
        </motion.div>

    );

};

export default Orders;