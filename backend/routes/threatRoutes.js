const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');

router.get('/', threatController.getThreats);
router.post('/', threatController.createThreat);

module.exports = router;