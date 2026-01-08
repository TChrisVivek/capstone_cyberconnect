const Incident = require("../models/Incident");

exports.createIncident = async (req, res) => {
  try {
    console.log("📥 [BACKEND] Received Incident Data:", req.body); // DEBUG LOG

    const { title, description, affectedSystems, impact, user_id } = req.body;

    // 1. Validation: Check if fields exist
    if (!title || !description || !affectedSystems || !impact) {
      console.log("❌ [BACKEND] Missing Fields");
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // 2. Validation: Check User ID
    if (!user_id) {
      console.log("❌ [BACKEND] User ID missing");
      return res.status(400).json({ error: "User ID is required." });
    }

    // 3. Create Incident
    const newIncident = new Incident({
      title,
      description,
      affectedSystems,
      impact,
      user_id,
      status: "Open",
      priority: "Medium"
    });

    const savedIncident = await newIncident.save();
    console.log("✅ [BACKEND] Success! Incident ID:", savedIncident._id);
    
    res.status(201).json(savedIncident);

  } catch (error) {
    // THIS IS THE IMPORTANT PART: Print the real error
    console.error("🔥 [BACKEND CRASH]:", error.message); 
    res.status(500).json({ error: error.message });
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};