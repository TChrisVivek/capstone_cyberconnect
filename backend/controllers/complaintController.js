const Complaint = require("../models/Complaint");

// Create a new Complaint
exports.createComplaint = async (req, res) => {
  try {
    console.log("📥 [BACKEND] Received Complaint:", req.body);

    const { title, description, category, contactEmail, user_id } = req.body;

    // 1. Validation
    if (!title || !description || !category) {
      return res.status(400).json({ error: "Please provide a title, description, and category." });
    }

    // 2. Create Complaint Object
    const newComplaint = new Complaint({
      title,
      description,
      category,
      contactEmail,
      user_id: user_id || null, // If user is logged in, save ID. If not, null.
    });

    // 3. Save to DB
    const savedComplaint = await newComplaint.save();
    
    console.log("✅ [BACKEND] Complaint Saved:", savedComplaint._id);
    res.status(201).json(savedComplaint);

  } catch (error) {
    console.error("🔥 [BACKEND CRASH] Complaint Error:", error.message);
    res.status(500).json({ error: "Server Error: " + error.message });
  }
};