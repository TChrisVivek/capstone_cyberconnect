const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security Middleware

// Import Controller Functions
const { 
  createComplaint, 
  getUserComplaints, 
  getAllComplaints, 
  updateStatus 
} = require('../controllers/complaintController');

// --- ROUTES ---

// 1. Create new report (Protected)
// POST /api/complaints
router.post('/', protect, createComplaint);

// 2. Get user's history (Protected)
// GET /api/complaints/my
router.get('/my', protect, getUserComplaints); 

// --- ADMIN ROUTES ---

// 3. Get ALL reports (Admin Dashboard)
// GET /api/complaints/all
router.get('/all', protect, getAllComplaints);

// 4. Update status (e.g., Mark as Resolved)
// PUT /api/complaints/:id/status
router.put('/:id/status', protect, updateStatus);

module.exports = router;