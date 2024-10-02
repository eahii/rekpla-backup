import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="container">
        <h1>Welcome to Recruitment App</h1>
        <Link to="/login" className="btn btn-primary">Login</Link> | <Link to="/register" className="btn btn-secondary">Register</Link>
    </div>
);

export default Home;