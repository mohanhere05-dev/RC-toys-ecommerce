import express from "express";

import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    createProductReview,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route("/")
    .get(getProducts)
    .post(protect, upload.single("image"), createProduct);

router.route("/:id")
    .get(getProductById)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

router.post("/:id/reviews", protect, createProductReview);

export default router;