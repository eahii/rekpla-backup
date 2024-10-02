import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.js';

const CreateJob = () => {
    const { auth } = useContext(AuthContext);
    const [form, setForm] = useState({
        title: '',
        description: '',
        skillsRequired: '',
        location: '',
        salary: '',
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const jobData = {
                title: form.title,
                description: form.description,
                skillsRequired: form.skillsRequired.split(',').map(s => s.trim()),
                location: form.location,
                salary: form.salary,
            };
            await axios.post('http://localhost:5000/api/jobs', jobData, {
                headers: { 'x-auth-token': auth.token },
            });
            alert('Job created successfully!');
            // Redirect or reset form
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2>Create Job</h2>
            <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
            <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
            <input type="text" name="skillsRequired" placeholder="Skills Required (comma separated)" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="text" name="salary" placeholder="Salary" onChange={handleChange} required />
            <button type="submit" className="btn btn-primary">Create Job</button>
        </form>
    );
};

export default CreateJob;