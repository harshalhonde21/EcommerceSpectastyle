  import User from "../Models/User.js";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcryptjs";

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
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, password: hashPassword });
      await user.save();
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.status(201).json({ token, user });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists." });
      }
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exists",
        });
      }
  
      const checkMatchPass = await bcrypt.compare(password, user.password);
  
      if (!checkMatchPass) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.status(201).json({ token, user }); 
  
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

