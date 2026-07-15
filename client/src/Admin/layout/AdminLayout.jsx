import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import "./AdminLayout.css";
import { motion } from "framer-motion";

const AdminLayout = () => {
    return (
        <motion.div
            className="admin-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }} className="admin-layout">
            <AdminSidebar />
            <main className="admin-content">
                <Outlet />
            </main>
        </motion.div>
    );
};

export default AdminLayout;