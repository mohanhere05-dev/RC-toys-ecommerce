import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="Product-Cards product-skeleton-card">
                    <span className="skeleton-badge"></span>
                    <div className="skeleton-wishlist"></div>
                    <div className="product-image skeleton-image"></div>
                    <div className="product-content skeleton-content">
                        <div className="skeleton-line skeleton-title"></div>
                        <div className="skeleton-line skeleton-price"></div>
                    </div>
                    <div className="rating skeleton-rating">
                        <span className="skeleton-star"></span>
                        <span className="skeleton-star"></span>
                        <span className="skeleton-star"></span>
                        <span className="skeleton-star"></span>
                        <span className="skeleton-star"></span>
                        <span className="skeleton-stock"></span>
                    </div>
                    <button className="cart-btn skeleton-button"></button>
                </div>
            ))}
        </>
    );
};

export default ProductSkeleton;
