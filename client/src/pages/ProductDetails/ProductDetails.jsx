import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import "./ProductDetails.css";
import ProductCard from '../../components/Products/ProductCard'
import Navbar from '../../components/Navbar'

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setProduct(data);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const related = res.data.filter(
          (item) =>
            item.category === data.category &&
            item._id !== data._id
        );

        setRelatedProducts(related);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();



  }, [id]);

  if (!product) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleWishlist = () => {

    dispatch(addToWishlist(product));

    toast.success("Product Added To Wishlist ❤️");

  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    toast.success("Product Added To Cart ✅");
  };

  return (
    <>
      <Navbar />
      <section className="product-details">
        <button
          className="back-btn"
          onClick={() => navigate("/products")}
        >
          <IoChevronBackOutline /> Back to Products
        </button>

        <div className="details-container">
          <div className="details-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="details-content">
            <span className="category">
              {product.category}
            </span>
            <h1>{product.name}</h1>
            <div className="rating">
              ⭐⭐⭐⭐⭐
              <span>(4.8)</span>
            </div>

            <h2 className="price">₹{product.price}</h2>
            <p className="stock">

              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}

            </p>

            <p className="description">

              {product.description}

            </p>

            <div className="quantity-box">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

            <button className="cart-btn-detail" onClick={handleAddToCart}>

              <FaShoppingCart /> Add To Cart

            </button>

            <button className="wishlist-btn" onClick={handleWishlist}>

              <FaHeart /> Add To Wishlist

            </button>

          </div>

        </div>

        <section className="related-products">

          <h2>You May Also Like</h2>

          <div className="related-grid">

            {relatedProducts.map((item) => (

              <ProductCard
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                stock={item.stock}
              />

            ))}

          </div>

        </section>

      </section>
    </>
  );
};

export default ProductDetails;