import React, { useState, useRef, useEffect } from 'react'
import logo from '../../public/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import './Navbar.css'


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const cartItems = useSelector((state) => state.cart.cartItems);

    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setShowProfile(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 8);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const user = JSON.parse(localStorage.getItem("user"));

    const firstLetter = user?.name?.charAt(0).toUpperCase();

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        toast.success("Logged Out Successfully");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
    };


    return (
        <>
            <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className='logo' onClick={() => navigate('/')}>
                    <img src={logo} alt="" />
                    <h1>V²-TurboToys</h1>
                </div>

                <div className='nav-links'>
                    <ul>
                        <li><NavLink to={'/'} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
                        <li><NavLink to={'/products'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink></li>
                        <li><NavLink to={'/about'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink></li>
                        <li><NavLink to={'/contact'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink></li>
                    </ul>
                </div>

                <div className="nav-action">
                    <div className="wishlist-wrapper">
                        <Link to="/wishlist" className="icon-btn">
                            <FaHeart className="wishlist-nav-icon" />
                        </Link>
                    </div>
                    <Link to={"/cart"} className="cart-wrapper icon-btn">
                        <button className="cart-btn"><PiShoppingCartSimpleFill /></button>
                        {totalItems > 0 && (
                            <span className="cart-badge">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    {
                        isLoggedIn ? (
                            <div className="profile-menu" ref={profileRef}>
                                <button
                                    className="profile-btn"
                                    onClick={() =>
                                        setShowProfile(!showProfile)
                                    }
                                >
                                    👤 {user?.name}
                                </button>

                                {
                                    showProfile && (
                                        <div className="profile-dropdown">
                                            <Link to="/profile">
                                                My Profile
                                            </Link>
                                            <Link to="/my-orders">
                                                My Orders
                                            </Link>
                                            <button onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <Link to="/login" className="login-link">
                                Login
                            </Link>
                        )
                    }
                </div>


                <div className="hambuger" onClick={() => setMenuOpen(!menuOpen)}>
                    <Link to="/wishlist" className="icon-btn">
                        <FaHeart className="wishlist-nav-icon" />
                    </Link>
                    <Link className='cart-icon icon-btn cart-wrapper' to="/cart" onClick={() => setMenuOpen(false)}> <IoCartOutline />
                        {totalItems > 0 && (
                            <span className="cart-badge">
                                {totalItems}
                            </span>
                        )} </Link>
                    <div className="menu-icon-button"><GiHamburgerMenu /></div></div>

                {menuOpen && (
                    <div className='overlay' onClick={() => setMenuOpen(false)}></div>
                )}

                <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

                    <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Home
                    </NavLink>

                    <NavLink to="/products" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Products
                    </NavLink>

                    <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        About Us
                    </NavLink>

                    <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Contact Us
                    </NavLink>



                    {
                        isLoggedIn ? (
                            <>
                                <div className="mobile-profile">

                                    <div className="mobile-avatar">
                                        {firstLetter}
                                    </div>

                                    <Link to='/profile'>
                                        <div className="mobile-user">
                                            <h4>{user?.name}</h4>
                                            <p>{user?.email}</p>
                                        </div>
                                    </Link>

                                </div>

                                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                                    👤 My Profile
                                </Link>

                                <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                                    📦 My Orders
                                </Link>

                                <button
                                    className="mobile-logout"
                                    onClick={handleLogout}
                                >
                                    <FaPowerOff /> Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar
