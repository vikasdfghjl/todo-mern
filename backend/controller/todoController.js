const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Get all todos
// @route   GET /api/to-do
// @access  Private
const getToDo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json(user.todos);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Create a new todo
// @route   POST /api/to-do
// @access  Private
const postToDo = asyncHandler(async (req, res) => {
    const { todo } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
        const newTodo = { todo, completed: false };
        user.todos.push(newTodo);
        await user.save();
        res.status(201).json(newTodo);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update a todo
// @route   PATCH /api/to-do/:id
// @access  Private
const updateToDo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        const todo = user.todos.id(req.params.id);
        if (todo) {
            todo.todo = req.body.todo || todo.todo;
            todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
            await user.save();
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Delete a todo
// @route   DELETE /api/delete/to-do/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
    // Find the user based on the authenticated user ID
    const user = await User.findById(req.user.id);
    console.log('Request Params:', req.params); // Log the request parameters

    if (user) {
        // Find the todo item by its unique ID
        const todo = user.todos.id(req.params._id);

        if (todo) {
            // Remove the todo from the array
            todo.remove();
            // Save the user document
            await user.save();
            return res.json({ message: 'Todo removed' });
        } else {
            return res.status(404).json({ message: 'Todo not found' });
        }
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});




module.exports = { getToDo, postToDo, updateToDo, deleteToDo };