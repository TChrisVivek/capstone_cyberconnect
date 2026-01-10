const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security

// Import Controller Functions
const { 
  getThreats, 
  createThreat 
} = require('../controllers/threatController');

// --- ROUTES ---

// 1. Get Threat Feed (Public - Everyone should be aware of threats)
// GET /api/threats
router.get('/', getThreats);

// 2. Create Manual Threat (Protected - Only Admins should do this)
// POST /api/threats
router.post('/', protect, createThreat);

module.exports = router;