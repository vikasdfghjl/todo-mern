import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from '../components/PrivateRoute';
import TodoPage from '../components/TodoPage';
import axiosInstance from '../services/axiosInstance';
import '../styles/styles.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userName, setUserName] = useState('');
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Fetch user profile
            axiosInstance.get('/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => setUserName(response.data.name))
            .catch(error => console.error('Error fetching user profile:', error));

            // Fetch todos
            axiosInstance.get('/to-do', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
        }
    }, [token]);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleCreate = (event) => {
        event.preventDefault();
        axiosInstance.post('/to-do', { todo: newTodo }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTodos([...todos, response.data]);
            setNewTodo('');
        })
        .catch(error => console.error('Error creating todo:', error));
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            {/* Protect /todos route using PrivateRoute */}
            <Route path="/todos" element={
                <PrivateRoute>
                    <TodoPage
                        userName={userName}
                        handleLogout={handleLogout}
                        handleCreate={handleCreate}
                        todos={todos}
                        newTodo={newTodo}
                        setNewTodo={setNewTodo}
                        setTodos={setTodos}
                    />
                </PrivateRoute>
            } />
        </Routes>
    );
}

export default App;
