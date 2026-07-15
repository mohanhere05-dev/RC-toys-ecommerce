import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import "./Cart.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { increaseQuantity, decreaseQuantity, removeFromCart, } from "../../features/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <motion.div
                className="cart-page"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <h2>Your Cart is Empty</h2>
                    
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <img src={item.image} alt={item.name} />

                                <div className="cart-details">
                                    <h2>{item.name}</h2>

                                    <p>₹{item.price}</p>

                                    <div className="quantity-box">
                                        <button
                                            onClick={() =>
                                                dispatch(decreaseQuantity(item._id))
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                dispatch(increaseQuantity(item._id))
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            dispatch(removeFromCart(item._id))
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="order-summary">
                            <h2>Order Summary</h2>

                            <p>Total Items : {totalItems}</p>

                            <h3>Total : ₹{totalPrice}</h3>

                            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                                Proceed To Checkout
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );
};

export default Cart;