import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/to-do');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/to-do', { todo: newTodo });
      fetchTodos();
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete/to-do/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  function NoDataPlaceholder() {
    return <li>No data available</li>;
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
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
    </div>
  );
}

export default App;