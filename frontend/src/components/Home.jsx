import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Todo App</h1>
            <div className="space-x-4">
                <button onClick={() => navigate('/register')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Register</button>
                <button onClick={() => navigate('/login')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Login</button>
            </div>
        </div>
    );
};

export default Home;