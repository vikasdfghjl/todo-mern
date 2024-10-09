import React from 'react';
import axiosInstance from '../services/axiosInstance';
import PrivateRoute from '../components/PrivateRoute';

const TodoPage = ({ userName, handleLogout, handleCreate, todos, newTodo, setNewTodo, setTodos }) => {

    const handleCheckboxChange = (id, completed) => {
        axiosInstance.patch(`/api/to-do/${id}`, { completed }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        })
        .catch(error => {
            console.error('Error updating todo:', error);
        });
    };

    const handleDelete = (id) => {
        console.log('Todo ID:', id);
        axiosInstance.delete(`/delete/to-do/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
        });
    };

    return (
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
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new todo"
                        className="border p-2 rounded w-full mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-300">Add Todo</button>
                </form>
                <ul>
                    {Array.isArray(todos) && todos.length === 0 ? (
                        <li className="text-gray-500">No data available</li>
                    ) : (
                        todos.map(todo => (
                            <li key={todo._id} className="flex justify-between items-center">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={(e) => handleCheckboxChange(todo._id, e.target.checked)}
                                    />
                                    {todo.todo}
                                </label>
                                <button 
                                    onClick={() => {
                                        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
                                        if (confirmDelete) {
                                            handleDelete(todo._id);
                                        }
                                    }} 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </PrivateRoute>
    );
};

export default TodoPage;
