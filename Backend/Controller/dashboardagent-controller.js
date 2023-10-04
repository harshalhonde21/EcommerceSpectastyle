import Agents from "../Models/Agents.js"

export const getAgents = async (req, res, next) => {
    try {
      const agents = await Agents.find();
      if (!agents || agents.length === 0) {
        return res.status(404).json({ message: "Managers not found" });
      }
      res.status(200).json(agents);
    } catch (error) {
      next(error);
    }
  };
  
  export const signupAgent = async (req, res, next) => {
    const { agentName, agentPassword } = req.body;
    try {
      const existingAgents = await Agents.findOne({ agentName });
      if (existingAgents) {
        return res.status(409).json({ message: "Agent already exists" });
      }
  
      const agents = new Agents({ agentName, agentPassword });
      await agents.save();
  
      res.status(201).json({ agents, message:"Agent signup success" });
    } catch (error) {
      next(error);
    }
  };
  
  export const loginAgent = async (req, res, next) => {
    const { agentName, agentPassword } = req.body;
    try {
      const agents = await Agents.findOne({ agentName });
      if (!agents) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      if (agents.agentPassword !== agentPassword) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      res.status(200).json({ agents,  message: "Login successful" });
    } catch (error) {
      next(error);
    }
  };