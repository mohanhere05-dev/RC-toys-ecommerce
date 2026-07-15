import React from "react";
import './Contact.css'

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ContactHero from "../../components/Contact/ContactHero";
import ContactForm from "../../components/Contact/ContactForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import MapSection from "../../components/Contact/MapSection";
import FAQSection from "../../components/Contact/FAQSection";

const Contact = () => {
    return (
        <>
            <Navbar />
            <ContactHero />

            <div className="contact-container">
                <ContactForm />
                <ContactInfo />
            </div>

            <MapSection />
            <FAQSection />
            <Footer />
        </>

    );
};

export default Contact;