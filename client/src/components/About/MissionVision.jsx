import { motion } from "framer-motion";
import { FaBullseye, FaRocket } from "react-icons/fa";
import "./MissionVision.css";

const MissionVision = () => {
    return (
        <section className="mission-section">

            <motion.div
                className="mission-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="icon-box">
                    <FaRocket />
                </div>

                <h2>Our Mission</h2>

                <p>
                    To deliver premium quality RC vehicles that
                    inspire excitement, innovation, and unforgettable
                    racing experiences for enthusiasts of all ages.
                </p>

            </motion.div>

            <motion.div
                className="vision-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="icon-box">
                    <FaBullseye />
                </div>

                <h2>Our Vision</h2>

                <p>
                    To become the world's most trusted RC brand by
                    combining innovation, performance, and customer
                    satisfaction in every product we create.
                </p>

            </motion.div>

        </section>
    );
};

export default MissionVision;