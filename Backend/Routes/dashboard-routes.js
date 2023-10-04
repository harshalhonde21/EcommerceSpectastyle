import express from "express";
import {
  getManager,
  signupManager,
  loginManager,
} from "../Controller/dashboard-controller.js";

const routerss = express.Router();

routerss.get('/', getManager);
routerss.post('/signup', signupManager);
routerss.post('/login', loginManager);


export default routerss;
