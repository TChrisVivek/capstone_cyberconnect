const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  affectedSystems: {
    type: String,
    required: true,
  },
  impact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Investigating", "Resolved", "Closed"],
    default: "Open",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Connects this incident to the User who reported it
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Incident", incidentSchema);