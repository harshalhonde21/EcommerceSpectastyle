import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config.js";

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

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.status(201).json({ token, user }); 

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

