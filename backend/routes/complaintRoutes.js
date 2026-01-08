const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

// POST /api/complaints - Submit a new complaint
router.post("/", complaintController.createComplaint);

module.exports = router;