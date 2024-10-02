import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.js';

const JobDetails = ({ match }) => {
    const [job, setJob] = useState(null);
    const { auth } = useContext(AuthContext);
    const jobId = match.params.id;
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
            setJob(res.data);
        };
        fetchJob();
    }, [jobId]);

    const handleApply = async () => {
        try {
            await axios.post('http://localhost:5000/api/applications', { jobId, coverLetter }, {
                headers: { 'x-auth-token': auth.token },
            });
            alert('Applied successfully!');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    if (!job) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Skills Required: {job.skillsRequired.join(', ')}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            {auth.user && auth.user.role === 'employee' && (
                <>
                    <textarea
                        name="coverLetter"
                        placeholder="Cover Letter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                    />
                    <button onClick={handleApply} className="btn btn-primary">Apply</button>
                </>
            )}
        </div>
    );
};

export default JobDetails;