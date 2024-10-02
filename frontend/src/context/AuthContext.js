import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: null,
    });

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setAuth({
            token: res.data.token,
            user: res.data.user,
        });
    };

    const register = async (userData) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setAuth({
            token: res.data.token,
            user: res.data.user,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            token: null,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};