const ActionLog = require('../models/ActionLog');

// 1. Helper function to create a log (Internal Use Only)
// This is NOT an API endpoint. It is used by other controllers (User, Post, Complaint).
exports.logAction = async (userId, action, details) => {
  try {
    if (!userId) return; // specific check to prevent crashes if no user ID

    await ActionLog.create({ 
      user: userId, 
      action, 
      details 
    });
    // console.log(`📝 Action Logged: ${action}`); // Uncomment for debugging
  } catch (error) {
    console.error("Failed to create log:", error.message);
  }
};

// 2. Get logs for the Current User (API Endpoint)
exports.getUserLogs = async (req, res) => {
  try {
    // Security: Use req.user.id (from token) instead of req.params.userId
    // This prevents users from seeing other people's logs.
    const logs = await ActionLog.find({ user: req.user.id })
      .sort({ createdAt: -1 }) // Newest first
      .limit(20); // Return last 20 logs (increased from 10)
      
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};