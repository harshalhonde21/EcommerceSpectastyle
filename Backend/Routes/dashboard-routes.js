import express from "express";
import dashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// GET /managers
router.get("/managers", dashboardController.getManagers);

// POST /managers/signup
router.post("/managers/signup", dashboardController.signupManager);

// POST /managers/login
router.post("/managers/login", dashboardController.loginManager);

export default router;