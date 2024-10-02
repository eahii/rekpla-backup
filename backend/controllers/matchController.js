const Job = require('../models/Job');
const User = require('../models/User');

// Simple similarity based on overlapping skills
function calculateMatchScore(userSkills, jobSkills) {
    const matches = userSkills.filter(skill => jobSkills.includes(skill));
    return (matches.length / jobSkills.length) * 100;
}

// Get recommended jobs for an employee
exports.getRecommendedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'employee') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const jobs = await Job.find();
        const recommendations = jobs.map(job => {
            const score = calculateMatchScore(user.profile.skills, job.skillsRequired);
            return { job, matchScore: score };
        }).sort((a, b) => b.matchScore - a.matchScore);

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get recommended employees for an employer's job
exports.getRecommendedEmployees = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        const employees = await User.find({ role: 'employee' });
        const recommendations = employees.map(emp => {
            const score = calculateMatchScore(emp.profile.skills, job.skillsRequired);
            return { employee: emp, matchScore: score };
        }).sort((a, b) => b.matchScore - a.matchScore);

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};