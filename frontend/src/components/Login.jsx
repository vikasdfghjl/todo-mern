import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_BASE_BE_URL2}/users/login`, { email, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/todos'); // Redirect to the to-do form page
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-8">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="border p-2 rounded w-full mb-4"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="border p-2 rounded w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-300">Login</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Login;