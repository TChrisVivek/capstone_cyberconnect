const Threat = require('../models/Threat');

// Get all threats (Sorted by newest)
exports.getThreats = async (req, res) => {
  try {
    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post a new threat (For Admins or Testing)
exports.createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};