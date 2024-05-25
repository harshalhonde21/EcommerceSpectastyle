// controllers/visitCountController.js
import VisitCount from "../Models/VisitCount.js";

export const getVisitCount = async (req, res) => {
  try {
    let visitCount = await VisitCount.findOne();
    if (!visitCount) {
      visitCount = new VisitCount();
    }
    res.json({ count: visitCount.count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const incrementVisitCount = async (req, res) => {
  try {
    let visitCount = await VisitCount.findOne();
    if (!visitCount) {
      visitCount = new VisitCount();
    }
    visitCount.count++;
    await visitCount.save();
    res.json({ count: visitCount.count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
