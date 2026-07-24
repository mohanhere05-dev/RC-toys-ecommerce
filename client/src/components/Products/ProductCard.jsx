import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosStarOutline } from "react-icons/io";
import './ProductCard.css'
import { MdAddShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist, } from '../../features/wishlist/wishlistSlice'

const Product = ({ id, image, name, price, category, description, stock }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector(
        (state) => state.wishlist.wishlistItems
    );

    const isWishlisted = wishlistItems.some(
        (item) => item._id === id
    );

    return (
        <>
            <motion.div
                className='Product-Cards' onClick={() => navigate(`/products/${id}`)}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                    y: -12,
                    transition: { duration: 0.3 }
                }}>
                <motion.span
                    className='badge'
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 250
                    }}>{category}</motion.span>

                {isWishlisted ? (
                    <FaHeart
                        className="wishlist-icon active"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeFromWishlist(id))
                        }}
                    />
                ) : (
                    <FaRegHeart
                        className="wishlist-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                                addToWishlist({
                                    _id: id,
                                    image,
                                    name,
                                    price,
                                    category,
                                    description,
                                    stock,
                                })
                            )
                        }
                        }
                    />
                )}

                <div className='product-image'>
                    <img
                        src={image.startsWith("/uploads")
                                ? `${import.meta.env.VITE_API_URL}${image}`
                                : image
                            }
                        alt={name}
                    />
                </div>

                <div className='product-content'>
                    <h3>{name}</h3>
                    <h2>${price}</h2>
                </div>

                <div className="rating">
                    {[...Array(description)].map((_, index) => (
                        <IoIosStarOutline key={index} />
                    ))}

                    <span>({stock} Stock) </span>
                </div>

                <button className='cart-btn'>
                    <span><MdAddShoppingCart /></span> &nbsp; Add to cart
                </button>
            </motion.div>
        </>
    )
};


export default Product
