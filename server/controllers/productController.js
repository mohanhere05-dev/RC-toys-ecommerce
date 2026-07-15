import Product from "../models/Product.js";

// GET Products
export const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// CREATE Product
export const createProduct = async (req, res) => {

    try {

        const product = await Product.create({

            name: req.body.name,

            price: req.body.price,

            category: req.body.category,

            description: req.body.description,

            stock: req.body.stock,

            image: req.file
                ? `/uploads/products/${req.file.filename}`
                : "",

        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// GET Single Product
export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found",
            });

        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// UPDATE Product
export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
            }

        );

        if (!product) {

            return res.status(404).json({
                message: "Product not found",
            });

        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// DELETE Product
export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found",
            });

        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const createProductReview = async (req, res) => {

    try {

        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found",
            });

        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(

            (review) =>

                review.user.toString() === req.user._id.toString()

        );

        if (alreadyReviewed) {

            return res.status(400).json({
                message: "You have already reviewed this product",
            });

        }

        const review = {

            user: req.user._id,

            name: req.user.name,

            rating: Number(rating),

            comment,

        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =

            product.reviews.reduce(

                (acc, item) => acc + item.rating,

                0

            ) / product.reviews.length;

        await product.save();

        res.status(201).json({

            message: "Review Added Successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};