import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import "./DashBoard.css";

const Dashboard = () => {
    const [stats, setStats] = useState({

        totalProducts: 0,

        totalOrders: 0,

        totalUsers: 0,

        totalRevenue: 0,

        monthlyRevenue: [],

        orderStatus: [],

        recentOrders: [],

        lowStockProducts: [],

        recentUsers: [],
    });

    const getDashboardStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/dashboard`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setStats(data);

        } catch (error) {

            toast.error("Failed to Load Dashboard");

        }

    };

    useEffect(() => {

        getDashboardStats();

    }, []);


    const COLORS = [

        "#f59e0b",

        "#3b82f6",

        "#8b5cf6",

        "#22c55e",

        "#ef4444",

    ];


    return (

        <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="dashboard">

            <h1>Admin Dashboard</h1>

            <p>
                Welcome back, Admin 👋
            </p>

            <motion.div
                className="dashboard-cards"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.12,
                        },
                    },
                }} className="dashboard-cards">

                <div className="dashboard-card">

                    <h3>Total Products</h3>

                    <span>{stats.totalProducts}</span>

                </div>

                <div className="dashboard-card">

                    <h3>Total Orders</h3>

                    <span>{stats.totalOrders}</span>

                </div>

                <div className="dashboard-card">

                    <h3>Total Users</h3>

                    <span>{stats.totalUsers}</span>

                </div>

                <div className="dashboard-card">

                    <h3>Total Revenue</h3>

                    <span>{stats.totalRevenue.toLocaleString()}</span>

                </div>

            </motion.div>
            <div className="dashboardChart">
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }} >

                    <h2>Revenue Overview</h2>

                    <ResponsiveContainer
                        width="100%"
                        height={250}
                    >

                        <LineChart
                            data={stats.monthlyRevenue}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2992ff"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </motion.div>

                <div className="chart-card">

                    <h2>Order Status</h2>

                    <ResponsiveContainer
                        width="100%"
                        height={280}
                    >

                        <PieChart>

                            <Pie
                                data={stats.orderStatus}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >

                                {stats.orderStatus.map(
                                    (entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>
            </div>

            <motion.div
                className="recent-orders"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}>

                <h2>Recent Orders</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {stats.recentOrders.map((order) => (

                            <tr key={order._id}>

                                <td>{order.user?.name}</td>

                                <td>₹{order.totalPrice}</td>

                                <td>{order.orderStatus}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </motion.div>

            <div className="low-stock">

                <h2>⚠ Low Stock Products</h2>

                <div className="low-stock-list">

                    {stats.lowStockProducts.map((product) => (

                        <div
                            className="low-stock-card"
                            key={product._id}
                        >

                            <img
                                src={`${import.meta.env.VITE_API_URL}${product.image}`}
                                alt={product.name}
                            />

                            <div>

                                <h4>{product.name}</h4>

                                <p>

                                    Stock Left :

                                    <strong>

                                        {product.stock}

                                    </strong>

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div className="recent-users">

                <h2>👥 Recent Users</h2>

                <div className="recent-users-list">

                    {stats.recentUsers.map((user) => (

                        <div
                            className="recent-user-card"
                            key={user._id}
                        >

                            <div className="user-avatar">

                                {user.name.charAt(0).toUpperCase()}

                            </div>

                            <div className="user-info">

                                <h4>{user.name}</h4>

                                <p>{user.email}</p>

                                <small>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </small>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </motion.div>

    );
};

export default Dashboard;