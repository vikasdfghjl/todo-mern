const express = require("express")
const router = express.Router()

const { postToDo, getToDo, deleteToDo } = require('../controller/todoController')


router.post('/to-do', postToDo)

router.get('/to-do', getToDo)

router.delete("/delete/to-do/:_id", deleteToDo)



module.exports = router;
