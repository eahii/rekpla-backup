import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.js';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [form, setForm] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get('http://localhost:5000/api/users/me', {
                headers: { 'x-auth-token': auth.token },
            });
            setProfile(res.data);
            setForm(res.data.profile || {});
        };
        fetchProfile();
    }, [auth.token]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/users/me', form, {
                headers: { 'x-auth-token': auth.token },
            });
            alert('Profile updated');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                {auth.user.role === 'employee' && (
                    <>
                        <input
                            type="text"
                            name="skills"
                            placeholder="Skills (comma separated)"
                            value={form.skills ? form.skills.join(', ') : ''}
                            onChange={e => setForm({ ...form, skills: e.target.value.split(',').map(s => s.trim()) })}
                        />
                        <textarea
                            name="experience"
                            placeholder="Experience"
                            value={form.experience || ''}
                            onChange={handleChange}
                        />
                    </>
                )}
                {auth.user.role === 'employer' && (
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={profile.company?.companyName || ''}
                        onChange={e => setForm({ ...form, company: { ...profile.company, companyName: e.target.value } })}
                    />
                )}
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;