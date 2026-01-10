const ActionLog = require('../models/ActionLog');

// 1. Helper function to create a log (We will use this in other controllers)
exports.logAction = async (userId, action, details) => {
  try {
    await ActionLog.create({ user: userId, action, details });
    console.log(`📝 Action Logged: ${action}`);
  } catch (error) {
    console.error("Failed to create log:", error);
  }
};

// 2. Get logs for a specific user (API Endpoint)
exports.getUserLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find({ user: req.params.userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Only return the last 10 logs
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};