import { motion } from "framer-motion";
import { FaCarSide, FaUsers, FaAward } from "react-icons/fa";
import "./StatsSection.css";

const StatsSection = () => {
    return (
        <>
            <section className="stats-section">

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <FaCarSide className="stat-icon" />
                    <h2>50K+</h2>
                    <p>Products Sold</p>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <FaUsers className="stat-icon" />
                    <h2>20K+</h2>
                    <p>Happy Customers</p>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <FaAward className="stat-icon" />
                    <h2>10+</h2>
                    <p>Years of Experience</p>
                </motion.div>

            </section>
        </>
    );
};

export default StatsSection;