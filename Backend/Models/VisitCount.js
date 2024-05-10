import mongoose from 'mongoose';

const visitCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('VisitCount', visitCountSchema);
