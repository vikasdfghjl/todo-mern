import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from '../components/PrivateRoute';
import axiosInstance from '../services/axiosInstance';
import '../styles/styles.css'; // Ensure this import is present to include the spinner styles

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userName, setUserName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchTodos(page);
            fetchUserName();
        }
    }, [token, page]);

    const fetchTodos = async (page) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/to-do', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page,
                    limit: 10,
                },
            });
            setTodos(response.data.todos);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserName = async () => {
        try {
            const response = await axiosInstance.get('/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserName(response.data.name);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch user name');
        }
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            await axiosInstance.post('/to-do', { todo: newTodo }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTodos(page);
            setNewTodo('');
        } catch (error) {
            console.error(error);
            setError('Failed to create todo');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/delete/to-do/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTodos(page);
        } catch (error) {
            console.error(error);
            setError('Failed to delete todo');
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    function NoDataPlaceholder() {
        return <li className="text-gray-500">No data available</li>;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/todos" element={
                <PrivateRoute>
                    <div className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-xl">Welcome, {userName}</p>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">Logout</button>
                        </div>
                        <form onSubmit={handleCreate} className="mb-4">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(event) => setNewTodo(event.target.value)}
                                placeholder="Enter a task here !!!"
                                className="border p-2 rounded w-full mb-2"
                            />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Create</button>
                        </form>
                        <button onClick={() => fetchTodos(page)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 mb-4">Fetch All To-Dos</button>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="bg-white shadow rounded p-4">
                                <ul className="space-y-2">
                                    {todos.length === 0 ? <NoDataPlaceholder /> : (
                                        todos.map((todo) => (
                                            <li key={todo._id} className="flex justify-between items-center p-2 border-b text-black">
                                                {todo.todo}
                                                <button onClick={() => handleDelete(todo._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                                    >
                                        Previous
                                    </button>
                                    <span>Page {page} of {totalPages}</span>
                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </PrivateRoute>
            } />
        </Routes>
    );
}

export default App;