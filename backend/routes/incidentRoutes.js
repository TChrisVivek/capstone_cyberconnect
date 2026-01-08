const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");

// POST /api/incidents - Report a new incident
router.post("/", incidentController.createIncident);

// GET /api/incidents - Get all incidents for the dashboard
router.get("/", incidentController.getAllIncidents);

module.exports = router;