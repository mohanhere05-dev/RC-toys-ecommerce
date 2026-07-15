import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !subject || !message) {
            toast.error("Please fill all fields");
            return;
        }


        try {

            await emailjs.send(

                import.meta.env.VITE_EMAILJS_SERVICE_ID,

                import.meta.env.VITE_CONTACT_TEMPLATE_ID,
                {
                    name,
                    email,
                    phone,
                    subject,
                    message,
                },

                import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            );

            toast.success("Message Sent Successfully!");

            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");

        } catch (error) {

            toast.error("Failed to Send Message");

            console.log(error);

        }

        finally {
            setLoading(false)
        }



    };


    return (

        <motion.section
            className="contact-form-section"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            viewport={{ once: true }}
        >

            <div className="contact-form">

                <h2>Send Us a Message</h2>

                <form onSubmit={handleSubmit}>

                    <div className="input-row">

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                        />

                    </div>

                    <div className="input-row">

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />

                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                        />

                    </div>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message..."
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                </form>

            </div>

        </motion.section>

    );
};

export default ContactForm;