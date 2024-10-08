import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If the token is not available, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the token exists, render the children
    return children;
};

export default PrivateRoute;
