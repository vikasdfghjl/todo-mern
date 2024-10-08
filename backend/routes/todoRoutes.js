const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { postToDo, getToDo, deleteToDo } = require('../controllers/todoController');

router.post('/to-do', protect, postToDo);
router.get('/to-do', protect, getToDo);
router.delete("/delete/to-do/:_id", protect, deleteToDo);

module.exports = router;