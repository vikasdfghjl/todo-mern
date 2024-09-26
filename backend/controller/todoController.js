const asyncHandler = require('express-async-handler')

const ToDoModel = require("../models/todo");
const router = require('../routes/todoRoutes');

// @desc Post To-do
// @route POST /api/to-do
// @access Private
// const postToDo = asyncHandler(async (req, res) => {

//     const { todo } = req.body;
//     const newtoDo = ToDoModel({ todo })
//     if (todo == "") {
//         res.redirect('/api/to-do')
//     }

//     //save the todo


//     newtoDo.save()
//         .then(() => {
//             console.log("Successfully added TO-DO")
//             res.redirect("/api/to-do")
//         })

//         .catch((err) => console.log(err))
// })

const postToDo = asyncHandler(async (req, res) => {
    try {
      const { todo } = req.body;
  
      if (!todo || todo.trim() === "") {
        return res.status(400).json({ message: "To-Do item cannot be empty" });
      }
  
      const newToDo = await ToDoModel.create({ todo });
  
      res.json(newToDo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating To-Do item" });
    }
  });


// @desc Delete To-do
// @route POST /api/to-do
// @access Private
// const deleteToDo = asyncHandler(async (req, res) => {
//     const { _id } = req.params;
//     const deleteOnetodo = ToDoModel.findById({ _id })
//     deleteOnetodo.remove()

//         .then(() => {
//             console.log("Deleted To-Do Successfully")
//             res.redirect("/api/to-do")
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

const deleteToDo = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.params;
  
      if (!_id) {
        return res.status(400).json({ message: "To-Do item ID is required" });
      }
  
      const deletedToDo = await ToDoModel.findByIdAndDelete(_id);
  
      if (!deletedToDo) {
        return res.status(404).json({ message: "To-Do item not found" });
      }
  
      res.json({ message: "To-Do item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting To-Do item" });
    }
  });

// @desc Get All ToDos
// @route GET /api/to-do
// @access Private
// const getToDo = asyncHandler(async (req, res) => {
//     const allToDo = await ToDoModel.find()

//     res.render("index", { todo: allToDo })


// })

const getToDo = asyncHandler(async (req, res) => {
    try {
      const allToDo = await ToDoModel.find().exec();
      
      if (!allToDo || allToDo.length === 0) {
        return res.status(404).json({ message: "No To-Do items found" });
      }
      
      res.json(allToDo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching To-Do items" });
    }
  });


module.exports = { postToDo, getToDo, deleteToDo }
