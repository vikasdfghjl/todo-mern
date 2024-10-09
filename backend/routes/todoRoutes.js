const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { postToDo, getToDo, deleteToDo, updateToDo } = require('../controller/todoController');

router.post('/to-do', protect, postToDo);
router.get('/to-do', protect, getToDo);
router.delete("/delete/to-do/:_id", protect, deleteToDo);
router.patch('/to-do/:_id', protect, updateToDo);

module.exports = router;