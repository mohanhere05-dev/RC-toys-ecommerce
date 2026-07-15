import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "./AdminProducts.css";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

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

    useEffect(() => {
        setShowModal(false);

        setIsEdit(false);

        setEditingId(null);

        setFormData({

            name: "",

            price: "",

            image: null,

            category: "",

            description: "",

            stock: "",

        });

        getProducts();
        getProducts();

    }, []);

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        stock: "",
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSaveProduct = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = new FormData();

            data.append("name", formData.name);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("description", formData.description);
            data.append("stock", formData.stock);
            data.append("image", formData.image);

            if (isEdit) {

                await axios.put(

                    `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,

                    data,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",

                        },

                    }

                );

                toast.success("Product Updated Successfully");

            } else {

                await axios.post(

                    "${import.meta.env.VITE_API_URL}/api/products",

                    data,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",

                        },

                    }

                );

                toast.success("Product Added Successfully");

            }

            toast.success("Product Added Successfully");

            setShowModal(false);

            setFormData({

                name: "",
                price: "",
                image: null,
                category: "",
                description: "",
                stock: "",

            });

            getProducts();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to Add Product"

            );

        }

    };

    const handleEdit = (product) => {

        setIsEdit(true);

        setEditingId(product._id);

        setFormData({

            name: product.name,

            price: product.price,

            image: null,

            category: product.category,

            description: product.description,

            stock: product.stock,

        });

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${import.meta.env.VITE_API_URL}/api/products/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Product Deleted Successfully");

            getProducts();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete Failed"

            );

        }

    };

    return (

        <motion.div className="admin-products" initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>

            <div className="products-header">

                <h1>Products</h1>

                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={() => {

                        setIsEdit(false);

                        setEditingId(null);

                        setFormData({

                            name: "",
                            price: "",
                            image: null,
                            category: "",
                            description: "",
                            stock: "",

                        });

                        setShowModal(true);

                    }}
                >
                    Add Product
                </button>

            </div>
            <div className="table-wrapper">
                <table>

                    <thead>

                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {products
                            .filter((product) =>
                                product.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((product) => (

                                <tr key={product._id}>

                                    <td>

                                        <img
                                            src={
                                                product.image.startsWith("/uploads")
                                                    ? `${import.meta.env.VITE_API_URL}${product.image}`
                                                    : product.image
                                            }
                                            alt={product.name}
                                            width="60"
                                        />

                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.category}</td>

                                    <td>₹{product.price}</td>

                                    <td>{product.stock}</td>

                                    <td>

                                        <button onClick={() => handleEdit(product)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleDelete(product._id)}>
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>
            </div>

            {
                showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.files[0],
                                    })
                                }
                            />

                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                            <div className="modal-buttons">

                                <button
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button onClick={handleSaveProduct}>
                                    {isEdit ? "Update Product" : "Save Product"}
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </motion.div>



    );

};

export default Products;