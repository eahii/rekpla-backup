const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middleware/auth');

// Get recommended jobs for an employee
router.get('/jobs', auth, matchController.getRecommendedJobs);

// Get recommended employees for a job (Employer only)
router.get('/jobs/:jobId/employees', auth, matchController.getRecommendedEmployees);

module.exports = router;