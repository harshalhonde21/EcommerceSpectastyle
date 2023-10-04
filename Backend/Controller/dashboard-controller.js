import Manager from "../Models/Manager.js";


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

export const signupManager = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const existingManager = await Manager.findOne({ name });
    if (existingManager) {
      return res.status(409).json({ message: "Manager already exists" });
    }

    const manager = new Manager({ name, password });
    await manager.save();

    res.status(201).json({ manager, message:"Manager signup success" });
  } catch (error) {
    next(error);
  }
};

export const loginManager = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const manager = await Manager.findOne({ name });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    if (manager.password !== password) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    res.status(200).json({ manager,  message: "Login successful" });
  } catch (error) {
    next(error);
  }
};
