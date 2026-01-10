const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String, // e.g., "Logged In", "Updated Profile"
    required: true
  },
  details: {
    type: String, // e.g., "User changed their email"
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ActionLog', actionLogSchema);