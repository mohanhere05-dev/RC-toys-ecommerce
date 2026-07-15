import React from 'react'
import "./CategoryCard.css";

const CategoryCard = ({ image, title, icon }) => {
  return (
    <>
      <div className="category-card">
      <img src={image} alt={title} className="category-img" />

      <div className="category-overlay">
        <div className="category-icon">
          {icon}
        </div>

        <h3>{title}</h3>
      </div>
    </div>

    </>
  )
}

export default CategoryCard
