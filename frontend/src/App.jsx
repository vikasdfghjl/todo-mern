import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../css/styles.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import axiosInstance from './axiosInstance';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchTodos();
            fetchUserName();
        }
    }, [token]);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/to-do', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTodos(response?.data);
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
            console.log('User Name:', response.data.name); // Add this line
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
            fetchTodos();
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
            fetchTodos();
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

    function NoDataPlaceholder() {
        return <li>No data available</li>;
    }

    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/todos" element={
              <PrivateRoute>
                  <div className="container">
                      <h1>To-Do List</h1>
                      <div className="welcome-container">
                          <p>Welcome, {userName}</p>
                          <button onClick={handleLogout} className="logout-btn">Logout</button>
                      </div>
                      <form onSubmit={handleCreate}>
                          <input
                              type="text"
                              value={newTodo}
                              onChange={(event) => setNewTodo(event.target.value)}
                              placeholder="Enter a task here !!!"
                              className="input-field"
                          />
                          <button type="submit" className="create-btn">Create</button>
                      </form>
                      <button onClick={fetchTodos} className="fetch-btn">Fetch All To-Dos</button>
                      {loading ? <p>Loading...</p> : (
                          <div className="todo-list-container">
                              <ul className="todo-list">
                                  {todos.length === 0 ? <NoDataPlaceholder /> : (
                                      todos.map((todo) => (
                                          <li key={todo._id}>
                                              {todo.todo}
                                              <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
                                          </li>
                                      ))
                                  )}
                              </ul>
                          </div>
                      )}
                  </div>
              </PrivateRoute>
          } />
      </Routes>
  );
}

export default App;