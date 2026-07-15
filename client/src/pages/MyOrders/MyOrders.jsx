import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import "./MyOrders.css";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.get(

                "${import.meta.env.VITE_API_URL}/api/orders/my-orders",

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setOrders(data);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load orders"

            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="orders-page">

                <h1>My Orders</h1>

                {

                    orders.length === 0 ?

                        (

                            <div className="empty-orders">

                                <h2>No Orders Yet</h2>

                                <p>

                                    Start shopping to place your first order.

                                </p>

                            </div>

                        )

                        :

                        (

                            orders.map((order) => (

                                <div
                                    key={order._id}
                                    className="order-card"
                                >

                                    <div className="order-header">

                                        <h3>

                                            Order #

                                            {order._id.slice(-6).toUpperCase()}

                                        </h3>

                                        <span className="status">

                                            {order.orderStatus}

                                        </span>

                                    </div>

                                    {

                                        order.orderItems.map((item) => (

                                            <div
                                                key={item._id}
                                                className="order-item"
                                            >

                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                />

                                                <div>

                                                    <h4>

                                                        {item.product.name}

                                                    </h4>

                                                    <p>

                                                        Qty :

                                                        {item.quantity}

                                                    </p>

                                                </div>

                                                <strong>

                                                    ₹{item.price}

                                                </strong>

                                            </div>

                                        ))

                                    }

                                    <div className="order-footer">

                                        <span>

                                            Total

                                        </span>

                                        <strong>

                                            ₹{order.totalPrice}

                                        </strong>

                                        <button
                                            className="details-btn"
                                            onClick={() => navigate(`/orders/${order._id}`)}
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

        </>

    );

};

export default MyOrders;