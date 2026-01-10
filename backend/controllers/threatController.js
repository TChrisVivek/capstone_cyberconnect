const Threat = require('../models/Threat');

// Get all threats
exports.getThreats = async (req, res) => {
  try {
    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new threat (For testing or Admin use)
exports.createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};