import { Link, NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingBag,
    FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";

import "./AdminSidebar.css";

const AdminSidebar = () => {
    return (
        <motion.aside
            className="admin-sidebar"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }} className="admin-sidebar">

            <div className="admin-logo">

                <img
                    src="/images/logo.png"
                    alt="TurboToys"
                />

                <h2>TurboToys</h2>

            </div>

            <Link to="/admin/dashboard">
                <FaTachometerAlt />
                Dashboard
            </Link>

            <Link to="/admin/products">
                <FaBoxOpen />
                Products
            </Link>

            <Link to="/admin/orders">
                <FaShoppingBag />
                Orders
            </Link>

            <Link to="/admin/users">
                <FaUsers />
                Users
            </Link>

        </motion.aside>
    );
};

export default AdminSidebar;