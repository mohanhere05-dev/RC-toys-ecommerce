import { motion } from "framer-motion";
import storyImg from "../../../public/images/onRoadCar.jpg";
import "./StorySection.css";

const StorySection = () => {
    return (
        <>
            <section className="story-section">

                <motion.div
                    className="story-image"
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={storyImg} alt="Our Story" />
                </motion.div>

                <motion.div
                    className="story-content"
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="story-tag">
                        THE BEGINNING
                    </span>

                    <h2>From a Garage to Global</h2>

                    <p>
                        V²-TurboToys started with a simple dream—to
                        create high-performance RC vehicles that
                        combine speed, durability and precision.
                        Every product is designed with passion and
                        tested to deliver an exciting racing
                        experience.
                    </p>

                    <p>
                        Today, we proudly serve RC enthusiasts
                        across the world with innovative designs,
                        premium materials and cutting-edge
                        engineering.
                    </p>

                </motion.div>

            </section>
        </>
    );
};

export default StorySection;