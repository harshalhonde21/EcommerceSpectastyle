import express from "express";
import { getMyUsers, login, signup } from "../Controller/user-controller.js";
import authMiddelware from "../Middelware/authMiddelware.js";
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,"/uploads");
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })

const router = express.Router();

router.get("/", getMyUsers); // my all users in one place
router.post("/signup",upload.single("fileInput"),signup); //my users should signup here
router.post("/login", login); //my users should login here

export default router;
