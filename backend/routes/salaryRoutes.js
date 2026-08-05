const express = require('express');
const router = express.Router();
const { generateSalarySlip } = require('../controllers/salaryController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/slip', verifyToken, generateSalarySlip);

module.exports = router;