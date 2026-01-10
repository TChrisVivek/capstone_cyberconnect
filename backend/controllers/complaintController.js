const Complaint = require('../models/Complaint');
const { logAction } = require('./actionLogController'); // ✅ Import Logger

// 1. Create a new Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    // Validation: Ensure all fields are present
    if (!title || !category || !description) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }
    
    // Create the complaint linked to the logged-in user
    // Note: We use req.user.id (from the auth token) for security
    const newComplaint = new Complaint({
      user: req.user.id, 
      title,
      category, // Using 'category' to match frontend input
      description,
      status: 'Pending' // Default status
    });

    await newComplaint.save();

    // 📝 LOG ACTION: Report Issue
    await logAction(req.user.id, "Reported Issue", `Submitted report: "${title}"`);

    res.status(201).json(newComplaint);

  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: "Failed to submit report" });
  }
};

// 2. Get Complaints for the Current User (My History)
exports.getUserComplaints = async (req, res) => {
  try {
    // Only fetch complaints belonging to the logged-in user
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get ALL Complaints (Admin Only)
exports.getAllComplaints = async (req, res) => {
  try {
    // Fetch all complaints and show the name/email of who reported it
    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update Complaint Status (Admin Only)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g., "Resolved", "In Progress"
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};