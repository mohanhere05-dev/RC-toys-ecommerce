import express from "express";
import { getProfile, updateProfile, changePassword, getUsers, deleteUser, } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get( "/", protect, adminMiddleware, getUsers );
router.delete( "/:id", protect, adminMiddleware, deleteUser );
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;