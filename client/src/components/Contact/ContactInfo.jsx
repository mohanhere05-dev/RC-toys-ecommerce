import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, } from "react-icons/fa";
import "./ContactInfo.css";
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";

const ContactInfo = () => {
    return (
        <>
            <div className="upInfo">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .5 }}
                    viewport={{ once: true }}>

                    <h2>Contact Information</h2>
                    <p>Visit our headquarters or reach out via phone or email. Our customer support is available Monday through Friday, 9am to 6pm.</p>
                    <div className="info-card">

                        <FaMapMarkerAlt className="info-icon" />

                        <div>
                            <h4>Address</h4>
                            <p>
                                Kolathur,
                                Chennai,
                                Tamil Nadu 600099
                            </p>
                        </div>

                    </div>

                    <div className="info-card">

                        <FaPhoneAlt className="info-icon" />

                        <div>
                            <h4>Phone</h4>
                            <p>+91 90809 11362</p>
                        </div>

                    </div>

                    <div className="info-card">

                        <FaEnvelope className="info-icon" />

                        <div>
                            <h4>Email</h4>
                            <p>support@v2turbotoys.com</p>
                        </div>

                    </div>

                    <div className="info-card">

                        <FaClock className="info-icon" />

                        <div>
                            <h4>Working Hours</h4>
                            <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
                        </div>

                    </div>
                </motion.div>
                <div className="socialInfo">
                    <h3>Connect With Us</h3>
                    <div className='socialicons'>
                        <Link to="/share"><FaInstagram /></Link>
                        <Link to="/world"><RiTwitterXFill /></Link>
                        <Link to="/rss"><FaYoutube /></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;