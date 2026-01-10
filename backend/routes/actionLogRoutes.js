const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security Middleware

// Import Controller Function
const { getUserLogs } = require('../controllers/actionLogController');

// --- ROUTES ---

// 1. Get Logs for Current User (Protected)
// GET /api/logs
router.get('/', protect, getUserLogs);

module.exports = router;