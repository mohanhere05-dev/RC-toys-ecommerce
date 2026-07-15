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
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post( "/", protect, adminMiddleware, upload.single("image"), createProduct );

router.put( "/:id", protect, adminMiddleware, updateProduct );

router.delete( "/:id", protect, adminMiddleware, deleteProduct );

router.post( "/:id/reviews", protect, createProductReview );

export default router;


// router.get("/", getProducts);

// router.get("/:id", getProductById);

// router.post("/", protect, adminMiddleware, createProduct);

// router.put("/:id", protect, adminMiddleware, updateProduct);

// router.delete("/:id", protect, adminMiddleware, deleteProduct);