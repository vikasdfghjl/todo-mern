const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing user
        required: true, // Make this field required
        ref: 'User' // Ensure to use the correct model name for the User
    }
});

module.exports = mongoose.model("ToDo", ToDoSchema);
