const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Create a new job (Employer only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'employer') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    const { title, description, skillsRequired, location, salary } = req.body;

    const newJob = new Job({
        employer: req.user.id,
        title,
        description,
        skillsRequired,
        location,
        salary,
    });

    try {
        const savedJob = await newJob.save();
        res.json(savedJob);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name companyName');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name companyName');
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Update a job (Employer only)
router.put('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Delete a job (Employer only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        await job.remove();
        res.json({ msg: 'Job removed' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;