import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            // Redirect or show success message
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default Login;