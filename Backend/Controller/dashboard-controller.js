import Manager from "../Models/Manager.js";
import { z } from 'zod';

// my manager it is the superhero 
export const getManager = async (req, res, next) => {
  try {
    const managers = await Manager.find();
    if (!managers || managers.length === 0) {
      return res.status(404).json({ message: "Managers not found" });
    }
    res.status(200).json(managers);
  } catch (error) {
    next(error);
  }
};

const signupSchema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const signupManager = async (req, res, next) => {
  try {
    const { name, password } = signupSchema.parse(req.body);
    const existingManager = await Manager.findOne({ name });

    if (existingManager) {
      return res.status(409).json({ message: "Manager already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const manager = new Manager({ name, password: hashedPassword });
    await manager.save();

    res.status(201).json({ manager, message:"Manager signup success" });
  } catch (error) {
    next(error);
  }
};

const loginSchema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const loginManager = async (req, res, next) => {
  try {
    const { name, password } = loginSchema.parse(req.body);
    const manager = await Manager.findOne({ name });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    if (!bcrypt.compareSync(password, manager.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    res.status(200).json({ manager, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};
