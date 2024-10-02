import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get('http://localhost:5000/api/jobs');
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

    return (
        <div className="container">
            <h2>Job Listings</h2>
            {auth.user && auth.user.role === 'employer' && <Link to="/create-job" className="btn btn-primary">Create Job</Link>}
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <Link to={`/jobs/${job._id}`}>{job.title}</Link> - {job.companyName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Jobs;