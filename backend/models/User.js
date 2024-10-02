const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['employer', 'employee'], required: true },
    profile: {
        // Define profile fields for employees
        skills: [String],
        experience: String,
        // Add more as needed
    },
    company: {
        // Define company fields for employers
        companyName: String,
        // Add more as needed
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);