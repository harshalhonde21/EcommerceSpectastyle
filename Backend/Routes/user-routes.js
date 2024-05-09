import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/users", authMiddleware, userController.getMyUsers);

// User Signup
router.post("/users/signup", userController.signup);

// User Login
router.post("/users/login", userController.login);

export default router;