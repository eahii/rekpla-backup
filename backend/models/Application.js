const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: String,
    status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'], default: 'applied' },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);