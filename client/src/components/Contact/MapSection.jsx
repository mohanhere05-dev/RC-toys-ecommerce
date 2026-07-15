import { motion } from "framer-motion";
import "./MapSection.css";

const MapSection = () => {
    return (
        <motion.section
            className="map-section"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >

            <h2>Find Us</h2>

            <iframe
                title="TurboToys Location"
                src="https://www.google.com/maps?q=Kolathur,Chennai&output=embed"
                loading="lazy"
                allowFullScreen
            ></iframe>

        </motion.section>
    );
};

export default MapSection;