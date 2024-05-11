  import User from "../Models/User.js";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcryptjs";
  import config from "../config.js";
  import multer from "multer";
  import path from 'path';


  const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/Images');
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({
    storage:storage
  }).single('profilePic'); 

  export const getMyUsers = async (req, res, next) => {
    let users;

    try {
      users = await User.find();
    } catch {
      return res.status(404).json({ message: "User not found add user" });
    }

    return res.status(200).json({ users });
  };

  export const signup = async (req, res, next) => {
    try {
      upload(req,res,async(err)=>{
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "Error uploading file" });
        } else if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        const {name, email, password} = req.body;
        let profilePic;
        if (req.file) {
          profilePic = req.file.filename;
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          profilePic
        });
  
        await user.save();
  
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.status(201).json({ token, user });
      })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const resetPassword = async(req,res,next)=>{
    try{
      const {email,password,confirmPassword} = req.body;
      const user = await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({ error: "Invalid username" })
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }
      const newpassword = await bcrypt.hash(password, 10);
      User.updateOne({ email : email }, { $set: { password:newpassword } })
     .then(() => {
      res.status(200).json({user})
     })
     .catch(err => {
      console.log(err)
      return res.status(400).json({ error: "Unable change password" })
     });
    }
    catch(err)
    {
      console.log(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // if (!user || user.password !== password) {
      //   return res.status(401).json({ message: "Invalid email or password." });
      // }

      if(!user)
      {
        return res.status(400).json({ error: "Invalid user" })
      }
      const isPasswordcorrect = await bcrypt.compare(password,user.password)
      if(!isPasswordcorrect)
      {
        return res.status(400).json({ error: "Invalid password" })
      }

      const token = jwt.sign({ _id: user._id }, config.jwtSecret);
      res.status(201).json({ token, user }); 

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updateUserProfilePic = async (req, res, next) => {
    try {
      upload(req,res,async(err)=>{
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "Error uploading file" });
        } else if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        const userId = req.body.userId;
        let profilePic;
        if (req.file) {
          profilePic = req.file.filename;
        }
        const user = await User.findByIdAndUpdate(
          userId,
          { profilePic: profilePic },
          { new: true }
        );
        res.status(201).json({user }); 
      })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
