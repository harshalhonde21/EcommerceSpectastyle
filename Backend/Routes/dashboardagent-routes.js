import express from "express";
import {
  getAgents,
  loginAgent,
  signupAgent
} from "../Controller/dashboardagent-controller.js";

const routersss = express.Router();


routersss.get('/', getAgents);
routersss.post('/signup', signupAgent);
routersss.post('/login', loginAgent);

export default routersss;
