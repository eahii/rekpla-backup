const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for a job (Employee only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    const { jobId, coverLetter } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // Check if already applied
        const existingApplication = await Application.findOne({ job: jobId, employee: req.user.id });
        if (existingApplication) {
            return res.status(400).json({ msg: 'Already applied to this job' });
        }

        const newApplication = new Application({
            job: jobId,
            employee: req.user.id,
            coverLetter,
        });

        const savedApplication = await newApplication.save();
        res.json(savedApplication);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get applications of the logged-in employee
router.get('/me', auth, async (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        const applications = await Application.find({ employee: req.user.id }).populate('job');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;