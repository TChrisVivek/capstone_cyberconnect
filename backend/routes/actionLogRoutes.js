const express = require('express');
const router = express.Router();
const actionLogController = require('../controllers/actionLogController');

// Route to get logs: GET /api/logs/:userId
router.get('/:userId', actionLogController.getUserLogs);

module.exports = router;