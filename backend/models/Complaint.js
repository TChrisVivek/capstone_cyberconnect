const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Platform Bug", "UI/UX Suggestion", "Account Issue", "Other"],
    default: "Platform Bug",
  },
  contactEmail: {
    type: String,
    required: false, // Optional: In case they want a reply
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Optional: Users can complain even if they can't login!
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);