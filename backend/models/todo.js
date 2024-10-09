const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("ToDo", ToDoSchema);