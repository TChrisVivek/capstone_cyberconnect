const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// POST /api/complaints/:userId -> Create new report
router.post('/:userId', complaintController.createComplaint);

// GET /api/complaints/:userId -> Get user's history
router.get('/:userId', complaintController.getUserComplaints);

module.exports = router;