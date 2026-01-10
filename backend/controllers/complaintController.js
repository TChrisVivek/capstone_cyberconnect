const Complaint = require('../models/Complaint');
const { logAction } = require('./actionLogController'); // ✅ Import Logger

// 1. Create a new Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, type, description } = req.body;
    
    // Create the complaint linked to the logged-in user
    const newComplaint = new Complaint({
      user: req.params.userId, // We get ID from the URL
      title,
      type,
      description
    });

    await newComplaint.save();

    // 📝 LOG ACTION: Report Issue
    await logAction(req.params.userId, "Reported Issue", `Submitted a ${type} report: "${title}"`);

    res.status(201).json(newComplaint);

  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: "Failed to submit report" });
  }
};

// 2. Get Complaints for a specific user (History)
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};