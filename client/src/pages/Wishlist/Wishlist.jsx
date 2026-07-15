import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import "./Wishlist.css";
import { motion } from "framer-motion";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(
        (state) => state.wishlist.wishlistItems
    );

    return (
        <>
            <Navbar />
            <motion.div
                className="wishlist-page"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <h1>My Wishlist</h1>

                {wishlistItems.length === 0 ? (

                    <div className="empty-wishlist">
                        <h2>Your Wishlist is Empty ❤️</h2>
                        <Link to="/products">
                            Continue Shopping <FaArrowRightLong />
                        </Link>
                    </div>

                ) : (

                    wishlistItems.map((item) => (
                        <motion.div
                            className="wishlist-item"
                            key={item._id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="wishlist-details">
                                <h2>{item.name}</h2>
                                <p>₹{item.price}</p>
                            </div>

                            <div className="wishlist-actions">
                                <button
                                    className="moveTo-cart"
                                    onClick={() => {
                                        dispatch(addToCart(item));
                                        dispatch(removeFromWishlist(item._id));
                                    }}
                                >
                                    Move To Cart
                                </button>
                                <button
                                    className="removed-btn"
                                    onClick={() =>
                                        dispatch(
                                            removeFromWishlist(item._id)
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div >
            <Footer />
        </>
    );
};

export default Wishlist;