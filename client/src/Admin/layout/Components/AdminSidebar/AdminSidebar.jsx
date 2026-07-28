import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingBag,
    FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";

import "./AdminSidebar.css";
import { useState } from "react";

const AdminSidebar = () => {


    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    return (
        <motion.aside
            className={`admin-sidebar ${expanded ? "expanded" : ""}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}>

            <div className="admin-logo" onClick={() => navigate('/')}>

                <img
                    src="/images/logo.png"
                    alt="TurboToys"
                />

                <h2 className="menu-text">TurboToys</h2>

            </div>

            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaTachometerAlt />
                <span className="menu-text">Dashboard</span>
            </NavLink>

            <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaBoxOpen />
                <span className="menu-text">Products</span>
            </NavLink>

            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaShoppingBag />
                <span className="menu-text">Orders</span>
            </NavLink>

            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaUsers />
                <span className="menu-text">Users</span>
            </NavLink>

        </motion.aside>
    );
};

export default AdminSidebar;