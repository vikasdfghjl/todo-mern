const asyncHandler = require('express-async-handler');
const ToDoModel = require("../models/todo");

// Function to create a new To-Do
const postToDo = asyncHandler(async (req, res) => {
    try {
        const { todo } = req.body;

        // Validate input
        if (!todo || todo.trim() === "") {
            return res.status(400).json({ message: "To-Do item cannot be empty" });
        }

        // Create a new To-Do item associated with the authenticated user
        const newToDo = await ToDoModel.create({
            todo,
            user: req.user.id // Store the user ID of the creator
        });

        res.status(201).json(newToDo); // Return the created To-Do item
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating To-Do item" });
    }
});

// Function to fetch all To-Dos for the authenticated user with pagination
const getToDo = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Fetch To-Do items specific to the authenticated user with pagination
      const allToDo = await ToDoModel.find({ user: req.user.id })
          .skip(skip)
          .limit(limit)
          .exec();

      const total = await ToDoModel.countDocuments({ user: req.user.id });

      if (!allToDo || allToDo.length === 0) {
          return res.status(404).json({ message: "No To-Do items found" });
      }

      res.json({
          todos: allToDo,
          total,
          page,
          pages: Math.ceil(total / limit),
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching To-Do items" });
  }
});

// Function to delete a To-Do by ID
const deleteToDo = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;

        // Validate input
        if (!_id) {
            return res.status(400).json({ message: "To-Do item ID is required" });
        }

        // Check if the To-Do belongs to the authenticated user
        const deletedToDo = await ToDoModel.findOneAndDelete({ _id, user: req.user.id });

        if (!deletedToDo) {
            return res.status(404).json({ message: "To-Do item not found or not authorized" });
        }

        res.json({ message: "To-Do item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting To-Do item" });
    }
});

module.exports = { postToDo, getToDo, deleteToDo };
