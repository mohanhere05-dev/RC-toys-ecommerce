import { motion } from "framer-motion";
import "./ContactHero.css";

const ContactHero = () => {
    return (
        <section className="contact-hero">

            <motion.div
                className="contact-hero-content"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >

                <span className="hero-tag">
                    CONTACT US
                </span>

                <h1>
                    Get In Touch
                </h1>

                <p>
                    Have questions about our RC vehicles or need help
                    choosing the perfect model? Our team is always
                    ready to assist you.
                </p>

            </motion.div>

        </section>
    );
};

export default ContactHero;