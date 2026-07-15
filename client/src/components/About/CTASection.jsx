import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
    return (
        <section className="cta-section">

            <motion.div
                className="cta-content"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2>Ready to Experience the Thrill?</h2>

                <p>
                    Discover our collection of premium RC cars,
                    monster trucks and racing machines built for
                    speed, precision and excitement.
                </p>

                <div className="cta-buttons">

                    <Link to="/products">
                        <button className="shop-btn">
                            Explore Products
                        </button>
                    </Link>

                    <Link to="/contact">
                        <button className="contact-btn">
                            Contact Us
                        </button>
                    </Link>

                </div>

            </motion.div>

        </section>
    );
};

export default CTASection;