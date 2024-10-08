import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Todo App</h1>
            <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>Register</button>
            <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>Login</button>
        </div>
    );
};

export default Home;