import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FAQSection.css";

const faqData = [
    {
        question: "How long does delivery take?",
        answer:
            "Orders are usually delivered within 3–7 business days depending on your location.",
    },
    {
        question: "Do your RC cars come with a warranty?",
        answer:
            "Yes, all our products include a limited manufacturer warranty against defects.",
    },
    {
        question: "Can I return a product?",
        answer:
            "Yes. Returns are accepted within 7 days if the product is unused and in its original packaging.",
    },
    {
        question: "How can I contact customer support?",
        answer:
            "You can reach us via our contact form, email, or phone during business hours.",
    },
];

const FAQSection = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                viewport={{ once: true }}
            >
                Frequently Asked Questions
            </motion.h2>

            {faqData.map((faq, index) => (

                <motion.div
                    key={index}
                    className="faq-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * .1 }}
                    viewport={{ once: true }}
                >

                    <div
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                    >

                        <h3>{faq.question}</h3>

                        {activeIndex === index
                            ? <FaChevronUp />
                            : <FaChevronDown />
                        }

                    </div>

                    {activeIndex === index && (

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {faq.answer}
                        </motion.p>

                    )}

                </motion.div>

            ))}

        </section>
    );
};

export default FAQSection;