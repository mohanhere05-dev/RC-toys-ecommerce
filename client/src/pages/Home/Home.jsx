import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import './Home.css'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'
import CategoryCard from '../../components/Products/CategoryCard';
import ProductCard from '../../components/Products/ProductCard';
import FeatureCard from '../../components/Products/FeatureCard';

import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

import { FaShoppingCart } from "react-icons/fa";
import { MdSportsMotorsports } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import { FaTruckMonster } from "react-icons/fa";

import { TfiTruck } from "react-icons/tfi";
import { MdOutlineVerified } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";


import logo from '../../../public/images/logo.png'
import driftCar from '../../../public/images/driftCar.jpg'
import offRoad from '../../../public/images/off-road.jpg'
import racingCar from '../../../public/images/onRoadCar.jpg'
import MonsterTruck from '../../../public/images/MonsterTruck.jpg'
import RoyalCar from '../../../public/images/royalCar.jpg'
import MinatureCar from '../../../public/images/minatureCar.jpg'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getProducts = async () => {

            try {

                const { data } = await axios.get(
                    "${import.meta.env.VITE_API_URL}/api/products"
                );

                setProducts(data);

            } catch (error) {

                console.log(error);

            }

        };

        getProducts();

    }, []);

    const [email, setEmail] = useState("");
    const handleSubscribe = async () => {

        if (!email) {

            toast.error("Please enter your email");

            return;

        }

        try {

            await emailjs.send(

                import.meta.env.VITE_EMAILJS_SERVICE_ID,

                import.meta.env.VITE_SUBSCRIBE_TEMPLATE_ID,

                {
                    to_email: email,
                },

                import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            );

            toast.success("Thanks for subscribing! 🚗");

            setEmail("");

        } catch (error) {

            console.log(error);

            toast.error("Failed to subscribe");

        }

    };

    return (
        <>
            {/* <div className={`home-wrapper ${!isLoggedIn ? "blur" : ""}`}> */}
            <Navbar />
            <motion.div
                className="hero"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h6>• NEW Release V2.0</h6>
                <h1>Dominate</h1>
                <h2>The Track.</h2>
                <p>Experience next-gen RC performance with <br /> brushless motors, 4WD traction, and speeds up to <br /> 60mph.</p>
                <div className="btn">
                    <Link to='/products'><button className='left-btn'>Start Your Engine →</button></Link>
                    <Link to=''><button className='right-btn'><span>▶︎</span> Watch Demo</button></Link>
                </div>
            </motion.div>

            <motion.section className="featured" initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                <div className='feature-head'>
                    <h2>Featured Categories</h2>
                </div>
                <center><div className='underline'></div></center>

                <motion.div className="category-container"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}>

                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}>

                        <Link to='/products'><CategoryCard
                            image={driftCar}
                            title="Drift Cars"
                            icon={<FaCarSide />}
                        /></Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}>

                        <Link to='/products'><CategoryCard
                            image={offRoad}
                            title="Off-Road"
                            icon={<FaCarCrash />}
                        /></Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}>

                        <Link to='/products'><CategoryCard
                            image={racingCar}
                            title="RacingCar"
                            icon={<FaCarOn />}
                        /></Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}>

                        <Link to='/products'><CategoryCard
                            image={MonsterTruck}
                            title="MonsterTruck"
                            icon={<FaTruckMonster />}
                        /></Link>
                    </motion.div>

                </motion.div>
            </motion.section>

            <motion.section className='products'
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                <div className='top-perfomance'>
                    <div>
                        <h2>Top Performance Models</h2>
                        <p>Our most sought-after engineering marvels.</p>
                    </div>
                    <Link to={'/products'}>View All Products ＞</Link>
                </div>

                <motion.div
                    className='product-container'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}>

                    {products.slice(1, 7).map((product) => (

                        <ProductCard
                            key={product._id}
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            description={product.description}
                            stock={product.stock}
                        />

                    ))}
                </motion.div>
            </motion.section>

            <section className="why-choose">

                <motion.div className="why-heading"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}>
                    <center>
                        <h2>Why Choose V²-TurboToys?</h2>
                        <p>Engineering the best RC experience for every enthusiast.</p>
                    </center>
                </motion.div>

                <motion.div className='feature-container'
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}>
                    <FeatureCard
                        icon={<TfiTruck />}
                        title="Fast Delivery"
                        description="Rapid global shipping so you can hit the track sooner."
                    />

                    <FeatureCard
                        icon={<MdOutlineVerified />}
                        title="Quality Products"
                        description="Each car is rigorously tested for precision and durability."
                    />
                    <FeatureCard
                        icon={<MdLockOutline />}
                        title="Secure Payment"
                        description="Enterprise-level security for all your transactions."
                    />

                    <FeatureCard
                        icon={<RiCustomerService2Fill />}
                        title="Customer Support"
                        description="Expert assistance for every technical question you have."
                    />

                </motion.div>

            </section>

            <motion.section className='join-section'
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                <div className='join-container'>
                    <div className='join-heading'>
                        <h2>Join the Racing World</h2>
                        <p>Subscribe for exclusive early access to new releases, technical tips, and member-only events.</p>
                    </div>
                    <div className='join-input' id='#email'>
                        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} /> <button onClick={handleSubscribe}>Subscribe</button>
                        <p>By subscribing, you agree to our Privacy Policy.</p>
                    </div>
                </div>
            </motion.section>

            <section className='footerSection'>
                <Footer />
            </section>
            {/* </div >
            {!isLoggedIn && <Login />
} */}
        </>
    )
}

export default Home
