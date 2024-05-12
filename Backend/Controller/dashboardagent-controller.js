import Agents from "../Models/Agents.js"
import { z } from 'zod';
import bcrypt from 'bcrypt';

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
  
  const agentSchema = z.object({
    agentName: z.string().min(1, 'Agent name is required'),
    agentPassword: z.string().min(1, 'Agent password is required'),
  });

  export const signupAgent = async (req, res, next) => {
    const { agentName, agentPassword } = req.body;
    try {
      const validatedData = agentSchema.parse(req.body);
  
      const existingAgents = await Agents.findOne({ agentName });
      if (existingAgents) {
        return res.status(409).json({ message: "Agent already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(agentPassword, 10);
  
      const agents = new Agents({ agentName, agentPassword: hashedPassword });
      await agents.save();
  
      res.status(201).json({ agents, message: "Agent signup success" });
    } catch (error) {
      next(error);
    }
  };
  
  export const loginAgent = async (req, res, next) => {
    const { agentName, agentPassword } = req.body;
    try {
      const validatedData = agentSchema.parse(req.body);
  
      const agents = await Agents.findOne({ agentName });
      if (!agents) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      const passwordMatch = await bcrypt.compare(agentPassword, agents.agentPassword); 
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      res.status(200).json({ agents, message: "Login successful" });
    } catch (error) {
      next(error);
    }
  };