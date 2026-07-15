import express from "express";

import { createOrder, getMyOrders, getOrderById, getOrders, updateOrderStatus, } from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";



import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, adminMiddleware, getOrders);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put( "/:id/status", protect, adminMiddleware, updateOrderStatus );

export default router;