import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register(form);
            // Redirect or show success message
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2>Register</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
            </select>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
};

export default Register;