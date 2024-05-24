import express from "express";
import {
  getMyUsers,
  login,
  resetPassword,
  sendOpt,
  signup,
} from "../Controller/user-controller.js";
import authMiddelware from "../Middelware/authMiddelware.js";

const router = express.Router();

router.get("/", getMyUsers); // my all users in one place
router.post("/signup", signup); //my users should signup here
router.post("/login", login); //my users should login here
router.post("/sendOpt", sendOpt); //my users should send opt here
router.post("/resetPassword", resetPassword); //my users reset password here

export default router;
