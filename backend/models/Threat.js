const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  source: { type: String, default: 'System Detection' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Threat', threatSchema);