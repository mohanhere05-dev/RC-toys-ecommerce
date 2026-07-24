import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import './Products.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/Products/ProductCard'
import Loading from "../../components/Loading";

import { MdClear } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import driftCar from "../../../public/images/driftedCar.webp";
import offRoad from "../../../public/images/off-road.webp";
import racingCar from "../../../public/images/onRoadCar.webp";
import monsterTruck from "../../../public/images/MonsterTruck.webp";

import { IoMdSearch } from "react-icons/io";

const Products = () => {

    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [sortBy, setSortBy] = useState("Newest");
    const [loading, setLoading] = useState(true);


    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;

    });

    const sortedProducts = [...filteredProducts];

    if (sortBy === "LowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "HighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "HighestRated") {
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter(
                    (item) => item !== category
                )
            );
        } else {
            setSelectedCategories([
                ...selectedCategories,
                category,
            ]);

        }

    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // const products = [
    //     {
    //         id: 1,
    //         image: driftCar,
    //         badge: "NEW",
    //         title: "Specter GT-1",
    //         price: 599,
    //         rating: 5,
    //         reviews: 48,
    //     },
    //     {
    //         id: 2,
    //         image: offRoad,
    //         badge: "HOT",
    //         title: "Desert Beast",
    //         price: 699,
    //         rating: 4,
    //         reviews: 31,
    //     },
    //     {
    //         id: 3,
    //         image: racingCar,
    //         badge: "SALE",
    //         title: "Formula X",
    //         price: 499,
    //         rating: 5,
    //         reviews: 18,
    //     },
    //     {
    //         id: 4,
    //         image: monsterTruck,
    //         badge: "NEW",
    //         title: "Monster King",
    //         price: 799,
    //         rating: 5,
    //         reviews: 63,
    //     },
    //     {
    //         id: 5,
    //         image: driftCar,
    //         badge: "HOT",
    //         title: "Drift Master",
    //         price: 549,
    //         rating: 4,
    //         reviews: 26,
    //     },
    //     {
    //         id: 6,
    //         image: racingCar,
    //         badge: "SALE",
    //         title: "Turbo Racer",
    //         price: 649,
    //         rating: 5,
    //         reviews: 41,
    //     },
    // ];
    if (loading) {
        return (
            <>
                <Navbar />
                <Loading />
            </>
        );
    }
    return (
        <>
            <Navbar />

            <section className="products-page">
                <motion.div className="products-heading" className="products-heading"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}>
                    <h1>Our Collection</h1>
                </motion.div>

                <motion.div className="search-bar" className="search-bar"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}>
                    <IoMdSearch className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search RC cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {searchTerm && (
                        <MdClear
                            className="clear-icon"
                            onClick={() => setSearchTerm("")}
                        />
                    )}



                </motion.div>

                <motion.div className="products-topbar" initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}>

                    <div className='filter' onClick={() => setShowFilter(true)}>
                        <span><LuFilter /></span>
                    </div>

                    <p>Showing {sortedProducts.length} of {products.length} Products</p>

                    <select className="sortby"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}>

                        <option value="Newest">Newest</option>

                        <option value="LowToHigh">
                            Price: Low to High
                        </option>

                        <option value="HighToLow">
                            Price: High to Low
                        </option>

                        <option value="HighestRated">
                            Highest Rated
                        </option>
                    </select>
                </motion.div>


                <div className="products-layout">
                    {/* SideBars */}
                    <motion.aside className={`sidebar ${showFilter ? "active" : ""}`} initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}>

                        <button
                            className="close-btn"
                            onClick={() => setShowFilter(false)}
                        >
                            <RiCloseFill />
                        </button>

                        <div className="filter-section">
                            <h3>Category</h3>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes("Drift")}
                                    onChange={() => handleCategoryChange("Drift")}
                                />
                                Drift Cars
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes("Off-Road")}
                                    onChange={() => handleCategoryChange("Off-Road")}
                                />
                                Off-Road
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes("Racing")}
                                    onChange={() => handleCategoryChange("Racing")}
                                />
                                Racing Cars
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes("Monster Truck")}
                                    onChange={() => handleCategoryChange("Monster Truck")}
                                />
                                Monster Trucks
                            </label>
                        </div>

                        <div className="filter-section">
                            <h3>Price Range</h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />

                            <p>₹0 - ₹{maxPrice}</p>
                        </div>

                        <div className="filter-section">

                            <h3>Brand</h3>

                            <label>
                                <input type="checkbox" />
                                Traxxas
                            </label>

                            <label>
                                <input type="checkbox" />
                                Arrma
                            </label>

                            <label>
                                <input type="checkbox" />
                                Tamiya
                            </label>

                            <label>
                                <input type="checkbox" />
                                Redcat
                            </label>

                        </div>
                    </motion.aside>
                    {/* <ProductGrid /> */}
                    <div className="products-grid">

                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
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

                            ))

                        ) : (

                            <div className="no-products">
                                <h2>No Products Found 😔</h2>
                                <p>
                                    We couldn't find any products matching
                                    "<strong>{searchTerm}</strong>"
                                </p>
                            </div>

                        )}

                    </div>
                </div>

                <motion.section className='pagination-container' initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}>
                    <Stack spacing={2} alignItems="center">
                        <Pagination count={10} color="primary" />
                    </Stack>
                </motion.section>

            </section>

            {showFilter && (
                <div
                    className="overlay"
                    onClick={() => setShowFilter(false)}
                ></div>
            )}
            <Footer />


        </>
    )

}

export default Products
