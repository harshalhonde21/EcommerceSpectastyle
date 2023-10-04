import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  agentName: {
    type: String,
    required: true,
  },
  agentPassword: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Agents", AgentSchema);
