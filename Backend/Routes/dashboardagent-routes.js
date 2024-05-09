import express from "express";
import dashboardAgentController from "../controllers/dashboardAgentController.js";

const router = express.Router();

// GET /agents
router.get("/agents", dashboardAgentController.getAgents);

// POST /agents/signup
router.post("/agents/signup", dashboardAgentController.signupAgent);

// POST /agents/login
router.post("/agents/login", dashboardAgentController.loginAgent);

export default router;