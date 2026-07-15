import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(

    "/",

    protect,

    adminMiddleware,

    getDashboardStats

);

export default router;