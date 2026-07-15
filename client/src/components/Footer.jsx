import React from 'react'
import './Footer.css'

import { motion } from 'framer-motion';
import logo from '../../public/images/logo.png'
import { Link } from 'react-router-dom'

import { BsWhatsapp } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";


const Footer = () => {
    return (
        <>
            <motion.footer className="footer"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>

                <motion.div className="logo-description"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}>

                    <div className='logo-section'>
                        <img src={logo} alt="" />
                        <h1>V²-TurboToys</h1>
                    </div>
                    <div>
                        <p>Precision engineering for enthusiasts. Experience high-octane racing with our premium collection of RC vehicles.</p>
                        <div className='social-icons'>
                            <Link to="/whatsapp"><BsWhatsapp /></Link>
                            <Link to="/world"><BiWorld /></Link>
                            <Link to="/insta"><FaInstagram /></Link>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="footer-Navigation"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <h3>NAVIGATION</h3>

                    <div className='footer-navlinks'>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/about">About us</Link>
                        <Link to="/contact">Contact us</Link>
                    </div>
                </motion.div>

                <motion.div className="footer-support"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3>SUPPORT</h3>
                    <div className='footer-supportlinks'>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/shipping">Shipping Info </Link>
                        <Link to="/return">Return Policy</Link>
                    </div>
                </motion.div>

                <motion.div className="footer-contact"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3>CONTACT</h3>
                    <div className='footer-contactlinks'>
                        <Link to="/contact"><MdOutlineEmail />vsquareentertrainment@gmail.com</Link>
                        <Link to="number"><MdOutlinePhone />+91 9080911362</Link>
                        <Link to="/location"><MdOutlineLocationOn />Chennai, Kolathur </Link>
                    </div>
                </motion.div>
            </motion.footer>

            <section className='copyRights'>
                <p>© 2024 RC World. All rights reserved. Precision Engineering for enthusiasts.</p>
            </section>
        </>
    )
}

export default Footer
